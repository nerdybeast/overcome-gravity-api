import mongoose from 'mongoose';
import { Document as IDocument } from 'mongoose';

export const WorkoutSchema = new mongoose.Schema({
	userId: String,
	clientId: String,
	name: String
});

export interface IWorkoutDocument extends IDocument {
	userId: string;
	clientId: string;
	name: string;
}
