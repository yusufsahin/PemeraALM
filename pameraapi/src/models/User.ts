import { Schema, model, Document, Types } from 'mongoose';
import { BaseModelSchema, IBaseModel } from './common/IBaseModel';
import { ISoftDeletable, SoftDeletableSchema } from './common/ISoftDeletable';
import { ITrackable, TrackableSchema } from './common/ITrackable';
import { IRole } from './Role';

export interface IUser extends IBaseModel, ISoftDeletable, ITrackable {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    roles: (Types.ObjectId | IRole)[];  // Many-to-Many relationship with Role
}

const UserSchema = new Schema<IUser>({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: Types.ObjectId, ref: 'Role' }]  // Array of Role references
});

UserSchema.add(BaseModelSchema);
UserSchema.add(SoftDeletableSchema);
UserSchema.add(TrackableSchema);
UserSchema.index({ deleted: 1 });

export const User = model<IUser>('User', UserSchema);
