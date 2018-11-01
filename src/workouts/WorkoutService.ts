import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IWorkoutDocument } from '../db/schemas/WorkoutSchema';
import { Workout } from '../models/Workout';

@Injectable()
export class WorkoutService {

	constructor(@InjectModel('Workout') private readonly workoutModel: Model<IWorkoutDocument>) {}

	public async create(userId: string, workout: Workout) : Promise<Workout> {
		const workoutDocument = this.toWorkoutDocument(userId, workout);
		const createdWorkoutModel = new this.workoutModel(workoutDocument);
		const result = await createdWorkoutModel.save();
		return this.fromMaxDocument(result);
	}

	public async findByUser(userId: string) : Promise<Workout[]> {
		const workoutDocuments = await this.workoutModel.find({ userId }).exec();
		return workoutDocuments.map(workoutDocument => this.fromMaxDocument(workoutDocument));
	}

	private toWorkoutDocument(userId: string, workout: Workout) : IWorkoutDocument {
		return new this.workoutModel({
			userId,
			clientId: workout.clientId,
			name: workout.name
		});
	}

	private fromMaxDocument(workoutDocument: IWorkoutDocument) : Workout {
		const workout = new Workout();
		workout.id = workoutDocument.id;
		workout.clientId = workoutDocument.clientId;
		workout.name = workoutDocument.name;
		return workout;
	}
}