import { ModelBase } from './ModelBase';

export class Exercise extends ModelBase {
	clientId: string;
	name: string;
	order: number;
	type: string;

	//This will be the id of the workout this exercise belongs to
	workout: string;
}