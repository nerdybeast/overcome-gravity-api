import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IWorkoutDocument } from '../db/schemas/WorkoutSchema';
import { Workout } from '../models/Workout';
import { FullWorkout } from '../models/FullWorkout';
import { ExerciseService } from '../exercises/ExerciseService';
import { SetsService } from '../sets/SetsService';
import { BaseModelService } from '../modules/database/BaseModelService';

@Injectable()
export class WorkoutService extends BaseModelService<IWorkoutDocument, Workout> {

	constructor(
		@InjectModel('Workout') private readonly workoutModel: Model<IWorkoutDocument>,
		private readonly exerciseService: ExerciseService,
		private readonly setsService: SetsService
	) {
		super(workoutModel);
	}

	public async findByUser(userId: string) : Promise<Workout[]> {
		return this.find({ userId });
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

	public async delete(workoutId: string) {
		return await this.workoutModel.findByIdAndDelete(workoutId);
	}

	protected toDatabaseDocument(workout: Workout) : IWorkoutDocument {
		return new this.workoutModel({
			clientId: workout.clientId,
			name: workout.name,
			userId: workout.userId
		});
	}

	protected fromDatabaseDocument(workoutDocument: IWorkoutDocument) : Workout {
		const workout = new Workout();
		workout.id = workoutDocument.id;
		workout.clientId = workoutDocument.clientId;
		workout.name = workoutDocument.name;
		workout.userId = workoutDocument.userId;
		workout.createdDate = workoutDocument.createdDate;
		return workout;
	}
}