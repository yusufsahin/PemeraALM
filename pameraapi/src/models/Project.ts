import { Schema, model, Types } from 'mongoose';
import { IBaseModel, BaseModelSchema } from './common/IBaseModel';
import { ISoftDeletable, SoftDeletableSchema } from './common/ISoftDeletable';
import { ITrackable, TrackableSchema } from './common/ITrackable';
import { IUser } from './User';
import { ProjectStatus } from '../enums/ProjectStatus';

export interface IProject extends IBaseModel, ISoftDeletable, ITrackable {
    name: string;
    description?: string;
    memo?: any;  // Change from string to any
    scope?: any; // Change from string to any
    projectManager?: Types.ObjectId | IUser | null; // Nullable reference to User
    projectAssistant?: Types.ObjectId | IUser | null; // Nullable reference to User
    startDate?: Date;
    finishDate?: Date;
    status?: ProjectStatus;
}

const ProjectSchema = new Schema<IProject>({
    name: { type: String, required: true },
    description: { type: String },
    memo: { type: Schema.Types.Mixed },  // Change from String to Schema.Types.Mixed
    scope: { type: Schema.Types.Mixed }, // Change from String to Schema.Types.Mixed
    projectManager: { type: Types.ObjectId, ref: 'User', default: null }, // Nullable field
    projectAssistant: { type: Types.ObjectId, ref: 'User', default: null }, // Nullable field
    startDate: { type: Date },
    finishDate: { type: Date },
    status: { type: String, enum: Object.values(ProjectStatus) }, // Store the enum as a string
});

ProjectSchema.add(BaseModelSchema);
ProjectSchema.add(SoftDeletableSchema);
ProjectSchema.add(TrackableSchema);
ProjectSchema.index({ deleted: 1 });

export const Project = model<IProject>('Project', ProjectSchema);
