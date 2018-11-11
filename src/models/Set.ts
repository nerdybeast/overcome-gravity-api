import { ModelBase } from './ModelBase';

export class Set extends ModelBase {
	clientId: string;
	order: number;
	reps: number;
	percent: number;
	repeatCount: number;
	kg: number;
	lbs: number;
	//This will be the id of the exercise this set belongs to.
	exercise: string;
}