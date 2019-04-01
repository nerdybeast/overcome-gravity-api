import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISetDocument } from '../db/schemas/SetSchema';
import { Set } from '../models/Set';
import { BaseModelService } from '../modules/database/BaseModelService';

@Injectable()
export class SetsService extends BaseModelService<ISetDocument, Set> {

	constructor(@InjectModel('Set') private readonly setModel: Model<ISetDocument>) {
		super(setModel);
	}

	public async findByExercise(exerciseId: string) : Promise<Set[]> {
		return this.findByExercises([exerciseId]);
	}

	public async findByExercises(exerciseIds: string[]) : Promise<Set[]> {
		return this.find({
			exercise: {
				$in: exerciseIds
			}
		})
	}

	public async delete(id: string) {
		await this.setModel.findByIdAndDelete(id).exec();
	}

	public async deleteMany(setIds: string[]) {
		return await this.setModel.deleteMany({
			_id: { $in: setIds }
		}).exec();
	}

	protected toDatabaseDocument(set: Set) : ISetDocument {
		return new this.setModel({
			clientId: set.clientId,
			order: set.order,
			reps: set.reps,
			percent: set.percent,
			repeatCount: set.repeatCount,
			kg: set.kg,
			lbs: set.lbs,
			exercise: set.exercise
		});
	}

	protected fromDatabaseDocument(setDocument: ISetDocument) : Set {
		const set = new Set();
		set.id = setDocument.id;
		set.clientId = setDocument.clientId;
		set.order = setDocument.order;
		set.reps = setDocument.reps;
		set.percent = setDocument.percent;
		set.repeatCount = setDocument.repeatCount;
		set.kg = setDocument.kg;
		set.lbs = setDocument.lbs;
		set.exercise = setDocument.exercise;
		return set;
	}
}