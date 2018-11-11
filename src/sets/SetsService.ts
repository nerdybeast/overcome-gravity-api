import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISetDocument } from '../db/schemas/SetSchema';
import { Set } from '../models/Set';

@Injectable()
export class SetsService {

	constructor(@InjectModel('Set') private readonly setModel: Model<ISetDocument>) {}

	public async create(set: Set) : Promise<Set> {
		const setDocument = this.toSetDocument(set);
		const createdSetModel = new this.setModel(setDocument);
		const result = await createdSetModel.save();
		return this.fromSetDocument(result);
	}

	public async findByExercises(exerciseIds: string[]) : Promise<Set[]> {

		const setsDocuments = await this.setModel.find({
			exercise: {
				$in: exerciseIds
			}
		}).exec();

		return setsDocuments.map(setDoc => this.fromSetDocument(setDoc));
	}

	public async update(set: Set) : Promise<Set> {

		const setDocument = await this.setModel.findByIdAndUpdate(set.id, set, {
			//Returns the modified document instead of the original
			new: true
		});

		return this.fromSetDocument(setDocument);
	}

	public async delete(id: string) {
		await this.setModel.findByIdAndDelete(id).exec();
	}

	private toSetDocument(set: Set) : ISetDocument {
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

	private fromSetDocument(setDocument: ISetDocument) : Set {
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