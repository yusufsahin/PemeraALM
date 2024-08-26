import { Schema, model, Types } from 'mongoose';
import { IBaseModel, BaseModelSchema } from './common/IBaseModel';
import { ISoftDeletable, SoftDeletableSchema } from './common/ISoftDeletable';
import { ITrackable, TrackableSchema } from './common/ITrackable';
import { IProject } from './Project';
import {WorkitemType} from "../enums/WorkitemType";
import {WorkitemState} from "../enums/WorkitemState";
import {WorkitemCategory} from "../enums/WorkitemCategory";


export interface IWorkitem extends IBaseModel, ISoftDeletable, ITrackable {
    name: string;
    description?: string;
    point?: number;
    dueDate?: Date;
    expectedDate?: Date;
    actualDate?: Date;
    responsibleUser?: Types.ObjectId | string | null;
    type?: WorkitemType;
    state?: WorkitemState;
    category?: WorkitemCategory;
    tasks?: Types.ObjectId[];
    project: Types.ObjectId | IProject; // `project` is required
    memo?: any;
    scope?: any;
}

const WorkitemSchema = new Schema<IWorkitem>({
    name: { type: String, required: true },  // Only `name` is required
    description: { type: String },
    point: { type: Number },
    dueDate: { type: Date },
    expectedDate: { type: Date },
    actualDate: { type: Date },
    responsibleUser: { type: Types.ObjectId, ref: 'User', default: null },
    type: { type: String, enum: Object.values(WorkitemType) },
    state: { type: String, enum: Object.values(WorkitemState) },
    category: { type: String, enum: Object.values(WorkitemCategory) },
    tasks: [{ type: Types.ObjectId, ref: 'Task' }],
    project: { type: Types.ObjectId, ref: 'Project', required: true }, // `project` is required
    memo: { type: Schema.Types.Mixed },
    scope: { type: Schema.Types.Mixed },
});

WorkitemSchema.add(BaseModelSchema);
WorkitemSchema.add(SoftDeletableSchema);
WorkitemSchema.add(TrackableSchema);

WorkitemSchema.index({ deleted: 1 });

export const Workitem = model<IWorkitem>('Workitem', WorkitemSchema);
