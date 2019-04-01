import { Model, Document } from 'mongoose';
import { IModelBase } from 'models/IModelBase';

export abstract class BaseModelService<T extends Document, U extends IModelBase> {

	constructor(protected readonly document: Model<T>) { }

	public async find(query: any) : Promise<U[]> {
		const documents = await this.run<T[]>(() => this.document.find(query).exec());
		return documents.map(document => this.fromDatabaseDocument(document));
	}

	public async findById(id: string) : Promise<U> {
		const document = await this.run<T>(() => this.document.findById(id));
		return this.fromDatabaseDocument(document);
	}

	public async create(model: U) : Promise<U> {
		const document = this.toDatabaseDocument(model);
		const savedDocument = await this.run<T>(() => document.save());
		return this.fromDatabaseDocument(savedDocument);
	}

	public async update(model: U) : Promise<U> {

		const document = await this.run<T>(() => this.document.findByIdAndUpdate(model.id, model, {
			new: true
		}));

		return this.fromDatabaseDocument(document);
	}

	protected abstract toDatabaseDocument(model: U) : T;
	protected abstract fromDatabaseDocument(document: T) : U;

	private async run<T>(fn: Function) : Promise<T> {
		try {
			return await fn();
		} catch(error) {
			console.error('Error running mongoose call ==>', error);
			throw error;
		}
	}

}
