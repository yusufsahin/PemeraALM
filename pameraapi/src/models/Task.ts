import {model, Schema, Types} from 'mongoose';

import {BaseModelSchema, IBaseModel} from './common/IBaseModel';
import {ISoftDeletable, SoftDeletableSchema} from './common/ISoftDeletable';
import {ITrackable, TrackableSchema} from './common/ITrackable';
import { IWorkitem } from './Workitem';
import {TaskType} from "../enums/TaskType";
import {TaskCategory} from "../enums/TaskCategory";
import {TaskStatus} from "../enums/TaskStatus";
import {IUser} from "./User";

export interface ITask extends IBaseModel, ISoftDeletable, ITrackable {
    name: string;
    description?: string;
    dueDate?: Date;
    expectedDate?: Date;
    actualDate?: Date;
    hoursExpected?: number;
    hoursActual?: number;
    assignTo?: Types.ObjectId | IUser | null;
    type?: TaskType;
    category?: TaskCategory;
    status?: TaskStatus;
    workitem: Types.ObjectId | IWorkitem;  // workitemid is required
}
const TaskSchema = new Schema<ITask>({
    name: { type: String, required: true },  // Only name is required
    description: { type: String },
    dueDate: { type: Date },
    expectedDate: { type: Date },
    actualDate: { type: Date },
    hoursExpected: { type: Number },
    hoursActual: { type: Number },
    assignTo: { type: Types.ObjectId, ref: 'User', default: null },  // Reference to User collection
    type: { type: String, enum: Object.values(TaskType) },
    category: { type: String, enum: Object.values(TaskCategory) },
    status: { type: String, enum: Object.values(TaskStatus) },
    workitem: { type: Types.ObjectId, ref: 'Workitem', required: true },  // workitemid is required
});

TaskSchema.add(BaseModelSchema);
TaskSchema.add(SoftDeletableSchema);
TaskSchema.add(TrackableSchema);

TaskSchema.index({ deleted: 1 });

export const Task = model<ITask>('Task', TaskSchema);