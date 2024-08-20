import { Schema, model, Document, Types } from 'mongoose';
import { BaseModelSchema, IBaseModel } from './common/IBaseModel';
import { ISoftDeletable, SoftDeletableSchema } from './common/ISoftDeletable';
import { ITrackable, TrackableSchema } from './common/ITrackable';
import { IRole } from './Role';

export interface IPrivilege extends IBaseModel, ISoftDeletable, ITrackable {
    name: string;
    description?: string;
    roles: (Types.ObjectId | IRole)[];  // Many-to-Many relationship with Role
}

const PrivilegeSchema = new Schema<IPrivilege>({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    roles: [{ type: Types.ObjectId, ref: 'Role' }]  // Array of Role references
});

PrivilegeSchema.add(BaseModelSchema);
PrivilegeSchema.add(SoftDeletableSchema);
PrivilegeSchema.add(TrackableSchema);
PrivilegeSchema.index({ deleted: 1 });

export const Privilege = model<IPrivilege>('Privilege', PrivilegeSchema);
