import mongoose from 'mongoose';
import { Document as IDocument } from 'mongoose';

export const PreferencesSchema = new mongoose.Schema({
	userId: String,
	weightType: String
});

export interface IPreferencesDocument extends IDocument {
	userId: string;
	weightType: string;
}
