import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IWorkoutDocument } from '../db/schemas/WorkoutSchema';
import { Workout } from '../models/Workout';

@Injectable()
export class WorkoutService {

	constructor(
		@InjectModel('Workout') private readonly workoutModel: Model<IWorkoutDocument>
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

	public async update(workout: Workout) : Promise<Workout> {

		const workoutDocument = await this.workoutModel.findByIdAndUpdate(workout.id, workout, {
			//Returns the modified document instead of the original
			new: true
		});

		return this.fromWorkoutDocument(workoutDocument);
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