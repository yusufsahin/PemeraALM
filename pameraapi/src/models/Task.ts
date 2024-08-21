import { Schema, Types, model } from 'mongoose';
import { IBaseModel, BaseModelSchema } from './common/IBaseModel';
import { ISoftDeletable, SoftDeletableSchema } from './common/ISoftDeletable';
import { ITrackable, TrackableSchema } from './common/ITrackable';

export interface ITask extends IBaseModel, ISoftDeletable, ITrackable {
    title: string;
    description?: string;
    status: string;
    assignee?: string;
    dueDate?: Date;
    workitem: Types.ObjectId;  // Ensure this is of type ObjectId
}

export const TaskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, required: true },
    assignee: { type: String },
    dueDate: { type: Date },
    workitem: { type: Schema.Types.ObjectId, ref: 'Workitem', required: true },  // Ensure the workitem field is required and references the Workitem schema
});

TaskSchema.add(BaseModelSchema);
TaskSchema.add(SoftDeletableSchema);
TaskSchema.add(TrackableSchema);

TaskSchema.index({ deleted: 1 });

export const Task = model<ITask>('Task', TaskSchema);
