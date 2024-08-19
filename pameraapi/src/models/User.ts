import { Schema, model, Document, Types } from 'mongoose';
import {BaseModelSchema, IBaseModel} from './common/IBaseModel';
import { ISoftDeletable, SoftDeletableSchema } from './common/ISoftDeletable';
import { ITrackable, TrackableSchema } from './common/ITrackable';

export interface IUser extends IBaseModel, ISoftDeletable, ITrackable {
    username?: string;
    email?: string;
    password?: string;
    roles?: Types.ObjectId[];  // Change this to Types.ObjectId[]
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: Types.ObjectId, ref: 'Role' }]  // Ensure roles is an array of ObjectId references
});

// Add the BaseModelSchema to inherit the _id to id mapping
UserSchema.add(BaseModelSchema);

// Add the SoftDeletableSchema to implement soft delete functionality
UserSchema.add(SoftDeletableSchema);
UserSchema.add(TrackableSchema);

// Optionally, add an index on the 'deleted' field for efficient querying
UserSchema.index({ deleted: 1 });

export const User = model<IUser>('User', UserSchema);
