import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IExerciseDocument } from '../db/schemas/ExerciseSchema';
import { Exercise } from '../models/Exercise';

@Injectable()
export class ExerciseService {

	constructor(@InjectModel('Exercise') private readonly exerciseModel: Model<IExerciseDocument>) {}

	public async create(exercise: Exercise) : Promise<Exercise> {
		const exerciseDocument = this.toExerciseDocument(exercise);
		const createdExerciseModel = new this.exerciseModel(exerciseDocument);
		const result = await createdExerciseModel.save();
		return this.fromExerciseDocument(result);
	}

	public async findByWorkout(workoutId: string) : Promise<Exercise[]> {
		return await this.findByWorkouts([workoutId]);
	}

	public async findByWorkouts(workoutIds: string[]) : Promise<Exercise[]> {

		const exerciseDocuments = await this.exerciseModel.find({
			workout: {
				$in: workoutIds
			}
		}).exec();

		return exerciseDocuments.map(exerciseDocument => this.fromExerciseDocument(exerciseDocument));
	}

	public async update(exercise: Exercise) : Promise<Exercise> {

		const exerciseDocument = await this.exerciseModel.findByIdAndUpdate(exercise.id, exercise, {
			//Returns the modified document instead of the original
			new: true
		});

		return this.fromExerciseDocument(exerciseDocument);
	}

	private toExerciseDocument(exercise: Exercise) : IExerciseDocument {
		return new this.exerciseModel({
			clientId: exercise.clientId,
			name: exercise.name,
			order: exercise.order,
			type: exercise.type,
			workout: exercise.workout,
			max: exercise.max
		});
	}

	private fromExerciseDocument(exerciseDocument: IExerciseDocument) : Exercise {
		const exercise = new Exercise();
		exercise.id = exerciseDocument.id;
		exercise.clientId = exerciseDocument.clientId;
		exercise.name = exerciseDocument.name;
		exercise.order = exerciseDocument.order;
		exercise.type = exerciseDocument.type;
		exercise.workout = exerciseDocument.workout;
		exercise.max = exerciseDocument.max;
		return exercise;
	}
}