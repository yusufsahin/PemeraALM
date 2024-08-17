import { Schema, model, Document } from 'mongoose';

export interface INote extends Document {
    _id?: string;
    title: string;
    content: string;

}

const NoteSchema = new Schema<INote>({
    title: { type: String, required: true },
    content: { type: String, required: true },

});

export const Note = model<INote>('Note', NoteSchema);