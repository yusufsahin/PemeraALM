import { Schema, model } from 'mongoose';
import { BaseModelSchema, IBaseModel } from './common/IBaseModel';
import { ISoftDeletable, SoftDeletableSchema } from './common/ISoftDeletable';
import { ITrackable, TrackableSchema } from './common/ITrackable';
import {ProjectStatus} from "../enums/ProjectStatus";

export interface IProject extends IBaseModel, ISoftDeletable, ITrackable {
    name: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    status?: ProjectStatus;
}

const ProjectSchema = new Schema<IProject>({
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: Number, enum: Object.values(ProjectStatus)}, // Store the enum as a number

});

ProjectSchema.add(BaseModelSchema);
ProjectSchema.add(SoftDeletableSchema);
ProjectSchema.add(TrackableSchema);
ProjectSchema.index({ deleted: 1 });

export const Project = model<IProject>('Project', ProjectSchema);
