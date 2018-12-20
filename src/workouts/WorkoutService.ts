import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IWorkoutDocument } from '../db/schemas/WorkoutSchema';
import { Workout } from '../models/Workout';
import { FullWorkout } from '../models/FullWorkout';
import { ExerciseService } from '../exercises/ExerciseService';
import { SetsService } from '../sets/SetsService';
import { MaxService } from '../max/max.service';

@Injectable()
export class WorkoutService {

	constructor(
		@InjectModel('Workout') private readonly workoutModel: Model<IWorkoutDocument>,
		private readonly exerciseService: ExerciseService,
		private readonly setsService: SetsService,
		private readonly maxService: MaxService
	) {}

	public async create(userId: string, workout: Workout) : Promise<Workout> {
		const workoutDocument = this.toWorkoutDocument(userId, workout);
		const createdWorkoutModel = new this.workoutModel(workoutDocument);
		const result = await createdWorkoutModel.save();
		return this.fromWorkoutDocument(result);
	}

	public async findById(id: string) : Promise<Workout> {
		const workoutDocument = await this.workoutModel.findById(id);
		return this.fromWorkoutDocument(workoutDocument);
	}

	public async findByUser(userId: string) : Promise<Workout[]> {
		const workoutDocuments = await this.workoutModel.find({ userId }).exec();
		const workouts = workoutDocuments.map(workoutDocument => this.fromWorkoutDocument(workoutDocument));
		return workouts;
	}

	public async findWithChildRecords(id: string) : Promise<FullWorkout> {

		const [ workout, exercises ] = await Promise.all([
			this.findById(id),
			this.exerciseService.findByWorkout(id)
		]);

		const sets = await this.setsService.findByExercises(exercises.map(exercise => exercise.id));

		const fullWorkout = new FullWorkout();
		fullWorkout.workout = workout;
		fullWorkout.exercises = exercises;
		fullWorkout.sets = sets;

		return fullWorkout;
	}

	public async update(workout: Workout) : Promise<Workout> {

		const workoutDocument = await this.workoutModel.findByIdAndUpdate(workout.id, workout, {
			//Returns the modified document instead of the original
			new: true
		});

		return this.fromWorkoutDocument(workoutDocument);
	}

	public async delete(workoutId: string) {
		return await this.workoutModel.findByIdAndDelete(workoutId);
	}

	private toWorkoutDocument(userId: string, workout: Workout) : IWorkoutDocument {
		return new this.workoutModel({
			userId,
			clientId: workout.clientId,
			name: workout.name
		});
	}

	private fromWorkoutDocument(workoutDocument: IWorkoutDocument) : Workout {
		const workout = new Workout();
		workout.id = workoutDocument.id;
		workout.clientId = workoutDocument.clientId;
		workout.name = workoutDocument.name;
		return workout;
	}
}