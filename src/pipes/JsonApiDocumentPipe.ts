import { PipeTransform, Injectable } from '@nestjs/common';
import { RequestObject } from '../models/RequestObject';

@Injectable()
export class JsonApiDocumentPipe implements PipeTransform {

	transform(value) {

		/**
		 * {
		 *   "data": {
		 *     "attributes": {
		 *       "client-id":"b675234f-2327-4e2b-b901-ae2b0c26cea3",
		 *       "name":"dfdffffff",
		 *       "order":2,
		 *       "type":"percent"
		 *     },
		 *     "relationships": {
		 *       "workout": {
		 *         "data": {
		 *           "type":"workouts",
		 *           "id":"1536696711281"
		 *         }
		 *       }
		 *     },
		 *     "id": undefined | "2w3e4r..."
		 *     "type":"exercises"
		 *   }
		 * }
		 */

		const id = value.data.id;
		const type = value.data.type;
		const model = value.data.attributes;
		const relationships = value.data.relationships;

		model.id = id;

		if(relationships) {

			Object.keys(relationships).forEach(relationshipName => {
				//const relationshipId = relationships[relationshipName].data.id;
				//model[relationshipName] = relationshipId;
				const relationshipData = relationships[relationshipName].data;

				if(relationshipData) {
					model[relationshipName] = relationshipData.id;
				}
			});

		}

		const requestObject = new RequestObject();
		requestObject.type = type;
		requestObject.model = model;

		return requestObject;
	}

}