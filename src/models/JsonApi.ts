import { isArray } from 'util';

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

export function serializeToJsonApi(models: any|any[], type: string, idProperty: string = 'id') : any {

	let documents: any = null;

	if(!isArray(models)) {

		documents = createDocument(models, type, idProperty);

	} else {

		documents = models.map(model => {
	
			const id = model[idProperty];
	
			//The "model" in this context ends up being the "attributes" key in the payload which can't have "id" as a property
			//because this property needs to be a level higher in the json api document.
			if(idProperty === 'id') delete model[idProperty];
	
			return new Document(id, type, model);
		});

	}

	const jsonApiDto = new JsonApiDto(documents);

	return jsonApiDto;
}

function createDocument<T>(model: any, type: string, idProperty: string) : Document<T> {

	const id = model[idProperty];

	//The "model" in this context ends up being the "attributes" key in the payload which can't have "id" as a property
	//because this property needs to be a level higher in the json api document.
	if(idProperty === 'id') delete model[idProperty];

	return new Document(id, type, model);
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