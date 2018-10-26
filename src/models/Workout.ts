import { ModelBase } from './ModelBase';
import { IWorkoutAttributes } from './IWorkoutAttributes';

export class Workout extends ModelBase implements IWorkoutAttributes {
	name: string;
}