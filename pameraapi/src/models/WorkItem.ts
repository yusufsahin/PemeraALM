import {Schema, model, Types} from 'mongoose';
import { BaseModelSchema, IBaseModel } from './common/IBaseModel';
import { ISoftDeletable, SoftDeletableSchema } from './common/ISoftDeletable';
import { ITrackable, TrackableSchema } from './common/ITrackable';
import { ITask, TaskSchema } from './Task';
import { IProject } from './Project';

export interface IWorkItem extends IBaseModel, ISoftDeletable, ITrackable {
    title: string;
    description?: string;
    status: string;
    project: Types.ObjectId | IProject;
    tasks: ITask[]; // Embed Task documents within WorkItem
}

const WorkItemSchema = new Schema<IWorkItem>({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    tasks: { type: [TaskSchema], default: [] } // Embedded array of Task documents
});

// Adding the common schemas to WorkItemSchema
WorkItemSchema.add(BaseModelSchema);
WorkItemSchema.add(SoftDeletableSchema);
WorkItemSchema.add(TrackableSchema);

export const WorkItem = model<IWorkItem>('WorkItem', WorkItemSchema);
