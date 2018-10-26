import { ModelBase } from './ModelBase';

export class Set extends ModelBase {
	clientId: string;
	order: number;
	reps: number;
	type: string;
	percent: number;
	repeatCount: number;

	//This will be the id of the max this set is based off of.
	max: string;

	//This will be the id of the exercise this set belongs to.
	exercise: string;
}