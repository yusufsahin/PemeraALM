import { Schema, model, Document } from 'mongoose';
import { BaseModelSchema, IBaseModel } from './common/IBaseModel';
import { ISoftDeletable, SoftDeletableSchema } from './common/ISoftDeletable';
import {ITrackable, TrackableSchema} from "./common/ITrackable";
import {auditMiddleware} from "../middlewares/auditMiddleware";

export interface IRole extends IBaseModel, ISoftDeletable, ITrackable {
    name: string;
    description?: string;
}

const RoleSchema = new Schema<IRole>({
    name: { type: String, required: true, unique: true },
    description: { type: String }
});

// Add the BaseModelSchema to inherit the _id to id mapping
RoleSchema.add(BaseModelSchema);

// Add the SoftDeletableSchema to implement soft delete functionality
RoleSchema.add(SoftDeletableSchema);
RoleSchema.add(TrackableSchema);

// Optionally, add an index on the 'deleted' field for efficient querying
RoleSchema.index({ deleted: 1 });
RoleSchema.plugin(auditMiddleware);

export const Role = model<IRole>('Role', RoleSchema);
