import { Schema, model } from 'mongoose';
import { BaseModelSchema, IBaseModel } from './common/IBaseModel';
import { ISoftDeletable, SoftDeletableSchema } from './common/ISoftDeletable';
import {ITrackable, TrackableSchema} from "./common/ITrackable";
import {auditMiddleware} from "../middlewares/auditMiddleware";

export interface IUser extends IBaseModel, ISoftDeletable,ITrackable {  // Extend both IBaseModel and ISoftDeletable
    username?: string;
    email?: string;
    password?: string;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true  },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Add the BaseModelSchema to inherit the _id to id mapping
UserSchema.add(BaseModelSchema);

// Add the SoftDeletableSchema to implement soft delete functionality
UserSchema.add(SoftDeletableSchema);
UserSchema.add(TrackableSchema);
// Optionally, add an index on the 'deleted' field for efficient querying
UserSchema.index({ deleted: 1 });
UserSchema.plugin(auditMiddleware);

export const User = model<IUser>('User', UserSchema);