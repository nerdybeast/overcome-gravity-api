import { isArray } from 'util';
import { ModelBase } from './ModelBase';
import clone from 'lodash.clonedeep';

export class JsonApiDto {

	constructor(data?: Document | Document[]) {
		this.data = data;
		this.included = [];
	}

	public data: Document | Document[];
	public included: Document[];
}

export class JsonApiRelationshipDto {
	constructor(
		public data: DocumentBase|DocumentBase[]
	) {}
}

export class DocumentBase {
	constructor(
		public id: string,
		public type: string
	) {}
}

export class Document extends DocumentBase {

	constructor(id: string, type: string, attributes: any) {
		super(id, type);
		this.attributes = attributes;
		this.relationships = {};
	}

	public attributes: any;
	public relationships: {[key: string]: JsonApiRelationshipDto|JsonApiRelationshipDto[]};
}

export function serializeToJsonApi<T extends ModelBase>(models: T|T[], type: string) : JsonApiDto {

	let documents: Document|Document[] = null;

	if(!isArray(models)) {
		documents = createDocument(models, type);
	} else {
		documents = models.map(model => createDocument(model, type));
	}

	const jsonApiDto = new JsonApiDto(documents);

	return jsonApiDto;
}

/**
 * Creates a new json api document where the given model extends ModelBase meaning it must have an "id" property.
 * @param model 
 * @param type 
 * @param idProperty 
 */
export function createDocument<T extends ModelBase>(model: T, type: string) : Document {

	//Capture the id property before we delete it.
	const id = model.id;

	//The "model" in this context ends up being the "attributes" key in the payload which can't have "id" as a property
	//because this property needs to be a level higher in the json api document.
	delete model.id;

	const document = new Document(id, type, model);

	return document;
}

export class Relationships {
	/**
	 * 
	 * @param name The name of the property on the original object for this relationship.
	 * @param type The type that needs to be set in the json for the json api standard.
	 * @param data 
	 */
	constructor(
		public name: string,
		public type: string,
		public data: ModelBase|ModelBase[]
	) {}
}

export class JsonApiErrorResponse {
	public errors: JsonApiError[] = [];
}

export class JsonApiError {
	public title: string;
	public details: string;
}

export function createDocument2<T extends ModelBase>(model: T, type: string, relationships: Relationships[] = []) : Document {

	model = clone(model);

	//Capture the id property before we delete it.
	const id = model.id;

	//The "model" in this context ends up being the "attributes" key in the payload which can't have "id" as a property
	//because this property needs to be a level higher in the json api document.
	delete model.id;

	const document = new Document(id, type, model);

	relationships.forEach(relationship => {
		if(isArray(relationship.data)) {

			const models = (relationship.data as ModelBase[]).map(x => new DocumentBase(x.id, relationship.type));
			document.relationships[relationship.name] = new JsonApiRelationshipDto(models);

		} else {

			const model = relationship.data as ModelBase;

			if(model) {
				const doc = new DocumentBase(model.id, relationship.type);
				document.relationships[relationship.name] = new JsonApiRelationshipDto(doc);
			}
		}
	});

	return document;
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