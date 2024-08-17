import { Schema, model } from 'mongoose';
import { BaseModelSchema, IBaseModel } from './common/IBaseModel';
import { ISoftDeletable, SoftDeletableSchema } from './common/ISoftDeletable';
import {ITrackable, TrackableSchema} from "./common/ITrackable";
import {auditMiddleware} from "../middlewares/auditMiddleware";

export interface INote extends IBaseModel, ISoftDeletable,ITrackable {  // Extend both IBaseModel and ISoftDeletable
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
NoteSchema.add(TrackableSchema);
// Optionally, add an index on the 'deleted' field for efficient querying
NoteSchema.index({ deleted: 1 });
NoteSchema.plugin(auditMiddleware);

export const Note = model<INote>('Note', NoteSchema);



