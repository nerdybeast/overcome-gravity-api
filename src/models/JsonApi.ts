// import { DocumentBase } from './DocumentBase';
import { IModelBase } from './IModelBase';

export class JsonApiDto<T> {

	constructor(data?: Document<T> | Document<T>[]) {
		this.data = data;
	}

	data: Document<T> | Document<T>[];
}

export class DocumentBase {

	constructor(id?: string, type?: string) {
		this.id = id;
		this.type = type;
	}

	id: string;
	type: string;
}

export class Document<T> extends DocumentBase {

	constructor(id: string, type: string, attributes: T) {
		super(id, type);
		this.attributes = attributes;
	}

	attributes: T;
}

export function serializeToJsonApi(model: any, type: string, idProperty: string = 'id') : any {

	const id = model[idProperty];

	if(idProperty === 'id') delete model[idProperty];

	const document = new Document(id, type, model);
	const jsonApiDto = new JsonApiDto(document);

	return jsonApiDto;
}

/**
 * {
 *   "data": {
 *     "id":"f4b468cf-5465-4597-8ac3-9f9d7870ccbd",
 *     "attributes": {
 *       "client-id":"f4b468cf-5465-4597-8ac3-9f9d7870ccbd",
 *       "name":"ererer"
 *     },
 *     "type":"workouts"
 *   }
 * }
 */