import { Schema, model, Document, Types } from 'mongoose';
import { BaseModelSchema, IBaseModel } from './common/IBaseModel'; // Ensure this path is correct

export interface INote extends IBaseModel {
    title: string;
    content: string;
}

const NoteSchema = new Schema<INote>({
    title: { type: String, required: true },
    content: { type: String},
});

// Add the BaseModelSchema to inherit the _id to id mapping
NoteSchema.add(BaseModelSchema);

export const Note = model<INote>('Note', NoteSchema);

