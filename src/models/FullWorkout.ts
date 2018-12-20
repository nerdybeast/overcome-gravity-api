import { Workout } from './Workout';
import { Exercise } from './Exercise';
import { Set } from './Set';

export class FullWorkout {
	workout: Workout;
	exercises: Exercise[];
	sets: Set[];
}