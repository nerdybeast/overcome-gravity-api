import mongoose from 'mongoose';
import { Document as IDocument } from 'mongoose';

export const ExerciseSchema = new mongoose.Schema({
	clientId: String,
	name: String,
	order: Number,
	type: String,
	workout: String,
	max: String
});

export interface IExerciseDocument extends IDocument {
	clientId: string;
	name: string;
	order: number;
	type: string;
	workout: string;
	max: string;
}
