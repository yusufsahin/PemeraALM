import { Schema, model, Document, Types } from 'mongoose';
import { BaseModelSchema, IBaseModel } from './common/IBaseModel';
import { ISoftDeletable, SoftDeletableSchema } from './common/ISoftDeletable';
import { ITrackable, TrackableSchema } from './common/ITrackable';
import { IPrivilege } from './Privilege';

export interface IRole extends IBaseModel, ISoftDeletable, ITrackable {
    name: string;
    description?: string;
    privileges: (Types.ObjectId | IPrivilege)[];  // Many-to-Many relationship with Privilege
}

const RoleSchema = new Schema<IRole>({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    privileges: [{ type: Types.ObjectId, ref: 'Privilege' }]  // Array of Privilege references
});

RoleSchema.add(BaseModelSchema);
RoleSchema.add(SoftDeletableSchema);
RoleSchema.add(TrackableSchema);
RoleSchema.index({ deleted: 1 });

export const Role = model<IRole>('Role', RoleSchema);



