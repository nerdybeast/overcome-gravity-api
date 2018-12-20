import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPreferencesDocument } from '../db/schemas/PreferencesSchema';
import { Preferences } from '../models/Preferences';

@Injectable()
export class PreferencesService {

	constructor(@InjectModel('Preferences') private readonly preferencesModel: Model<IPreferencesDocument>) {}

	public async findByUser(userId: string) : Promise<Preferences> {

		const preferencesDocument = await this.preferencesModel.findOne({ userId }).exec();

		if(!preferencesDocument) {
			throw new NotFoundException(`No preferences found for user "${userId}"`);
		}

		return this.fromPreferencesDocument(preferencesDocument);
	}

	public async create(preferences: Preferences) : Promise<Preferences> {
		const preferencesDocument = this.toPreferencesDocument(preferences);
		const result = await preferencesDocument.save();
		return this.fromPreferencesDocument(result);
	}

	public async update(preferences: Preferences) : Promise<Preferences> {

		const preferencesDocument = await this.preferencesModel.findByIdAndUpdate(preferences.id, preferences, {
			//Returns the modified document instead of the original
			new: true
		});

		return this.fromPreferencesDocument(preferencesDocument);
	}

	private toPreferencesDocument(preferences: Preferences) : IPreferencesDocument {
		return new this.preferencesModel({
			userId: preferences.userId,
			weightType: preferences.weightType
		});
	}

	private fromPreferencesDocument(preferencesDocument: IPreferencesDocument) : Preferences {
		const preferences = new Preferences();
		preferences.userId = preferencesDocument.userId;
		preferences.weightType = preferencesDocument.weightType;
		return preferences;
	}
}