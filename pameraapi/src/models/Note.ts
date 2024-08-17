import { Schema, model } from 'mongoose';
import { BaseModelSchema, IBaseModel } from './common/IBaseModel';
import { ISoftDeletable, SoftDeletableSchema } from './common/ISoftDeletable';

export interface INote extends IBaseModel, ISoftDeletable {  // Extend both IBaseModel and ISoftDeletable
    title: string;
    content?: string;
}

const NoteSchema = new Schema<INote>({
    title: { type: String, required: true },
    content: { type: String },
});

// Add the BaseModelSchema to inherit the _id to id mapping
NoteSchema.add(BaseModelSchema);

// Add the SoftDeletableSchema to implement soft delete functionality
NoteSchema.add(SoftDeletableSchema);

// Optionally, add an index on the 'deleted' field for efficient querying
NoteSchema.index({ deleted: 1 });

export const Note = model<INote>('Note', NoteSchema);



