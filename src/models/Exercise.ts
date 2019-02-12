import { ModelBase } from './ModelBase';

export class Exercise extends ModelBase {
	clientId: string;
	name: string;
	order: number;
	type: string;

	//Will be the workout id
	workout: string;

	/**
	 * Will be the max id
	 */
	max: string;
}