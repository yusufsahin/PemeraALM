import { Schema, model, Document } from 'mongoose';

export interface INoteEntity extends Document {
    _id?: string;
    title: string;
    content: string;

}

const NoteSchema = new Schema<INoteEntity>({
    title: { type: String, required: true },
    content: { type: String, required: true },

});

export const NoteEntity = model<INoteEntity>('Note', NoteSchema);