import mongoose from 'mongoose';
import { Document as IDocument } from 'mongoose';

export const SetSchema = new mongoose.Schema({
	clientId: String,
	order: Number,
	reps: Number,
	percent: Number,
	repeatCount: Number,
	kg: Number,
	lbs: Number,
	exercise: String
});

export interface ISetDocument extends IDocument {
	clientId: string,
	order: number,
	reps: number,
	percent: number,
	repeatCount: number,
	kg: number,
	lbs: number,
	//This will be the id of the exercise this set belongs to.
	exercise: string
}
