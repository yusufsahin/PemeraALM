import { Schema, Types, model } from 'mongoose';
import { IBaseModel, BaseModelSchema } from './common/IBaseModel';
import { ISoftDeletable, SoftDeletableSchema } from './common/ISoftDeletable';
import { ITrackable, TrackableSchema } from './common/ITrackable';

export interface ITask extends IBaseModel, ISoftDeletable, ITrackable {
    title: string;
    description?: string;
    status: string;
    assignee?: string; // Could be a user ID or similar reference
    dueDate?: Date;
}

export const TaskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, required: true },
    assignee: { type: String },
    dueDate: { type: Date }
});

// Add the BaseModelSchema to inherit the _id to id mapping
TaskSchema.add(BaseModelSchema);

// Add the SoftDeletableSchema to implement soft delete functionality
TaskSchema.add(SoftDeletableSchema);
TaskSchema.add(TrackableSchema);

// Optionally, add an index on the 'deleted' field for efficient querying
TaskSchema.index({ deleted: 1 });

export const Task = model<ITask>('Task', TaskSchema);


