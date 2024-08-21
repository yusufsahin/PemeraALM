import { Schema, Types, model } from 'mongoose';
import { IBaseModel, BaseModelSchema } from './common/IBaseModel';
import { ISoftDeletable, SoftDeletableSchema } from './common/ISoftDeletable';
import { ITrackable, TrackableSchema } from './common/ITrackable';

export interface IWorkitem extends IBaseModel, ISoftDeletable, ITrackable {
    title: string;
    description?: string;
    status: string;
    project: Types.ObjectId | string;
}

const WorkitemSchema = new Schema<IWorkitem>({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true }, // Reference to Project

});

// Adding the common schemas to WorkItemSchema
WorkitemSchema.add(BaseModelSchema);
WorkitemSchema.add(SoftDeletableSchema);
WorkitemSchema.add(TrackableSchema);

export const Workitem = model<IWorkitem>('Workitem', WorkitemSchema);
