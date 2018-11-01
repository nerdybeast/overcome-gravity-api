import mongoose from 'mongoose';
import { Document as IDocument } from 'mongoose';

export const MaxSchema = new mongoose.Schema({
	userId: String,
	clientId: String,
	name: String,
	kg: Number,
	lbs: Number
});

export interface IMaxDocument extends IDocument {
	userId: string;
	clientId: string;
	name: string;
	kg: number;
	lbs: number;
}
