import { Schema, model, Document, Types } from 'mongoose';
import { IBaseModel, BaseModelSchema } from './common/IBaseModel';
import { ISoftDeletable, SoftDeletableSchema } from './common/ISoftDeletable';
import { ITrackable, TrackableSchema } from './common/ITrackable';
import { ProjectStatus } from '../enums/ProjectStatus';

export interface IProject extends IBaseModel, ISoftDeletable, ITrackable {
    name: string;
    description?: string;
    memo?: string;
    scope?: string;
    projectManager?: string;
    projectAssistant?: string;
    startDate?: Date;
    finishDate?: Date;
    status?: ProjectStatus;
}

const ProjectSchema = new Schema<IProject>({
    name: { type: String, required: true },
    description: { type: String },
    memo: { type: String },
    scope: { type: String },
    projectManager: { type: String },
    projectAssistant: { type: String },
    startDate: { type: Date },
    finishDate: { type: Date },
    status: { type: String, enum: Object.values(ProjectStatus) }, // Store the enum as a string
});

ProjectSchema.add(BaseModelSchema);
ProjectSchema.add(SoftDeletableSchema);
ProjectSchema.add(TrackableSchema);
ProjectSchema.index({ deleted: 1 });

export const Project = model<IProject>('Project', ProjectSchema);
