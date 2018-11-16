import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Max } from '../models/Max';
import { IMaxDocument } from 'db/schemas/MaxSchema';

@Injectable()
export class MaxService {

	constructor(@InjectModel('Max') private readonly maxModel: Model<IMaxDocument>) {}

	public async create(userId: string, max: Max): Promise<Max> {
		const createdMax = this.toMaxDocument(userId, max);
		const createdMaxModel = new this.maxModel(createdMax);
		const result = await createdMaxModel.save();
		return this.fromMaxDocument(result);
	}

	public async findByUser(userId: string) : Promise<Max[]> {
		const results = await this.maxModel.find({ userId }).exec();
		return results.map(x => this.fromMaxDocument(x));
	}

	public async update(max: Max) : Promise<Max> {

		const maxDocument = await this.maxModel.findByIdAndUpdate(max.id, max, {
			//Returns the modified document instead of the original
			new: true
		});

		return this.fromMaxDocument(maxDocument);
	}

	private toMaxDocument(userId: string, max: Max) : IMaxDocument {
		return new this.maxModel({
			userId,
			clientId: max.clientId,
			name: max.name,
			kg: max.kg,
			lbs: max.lbs
		});
	}

	private fromMaxDocument(maxDocument: IMaxDocument) : Max {
		const max = new Max();
		max.id = maxDocument.id;
		max.clientId = maxDocument.clientId;
		max.name = maxDocument.name;
		max.kg = maxDocument.kg;
		max.lbs = maxDocument.lbs;
		return max;
	}
}