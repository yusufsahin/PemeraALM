import { Schema } from 'mongoose';

export interface ISoftDeletable {
    deleted: boolean;

}

export const SoftDeletableSchema: Schema<ISoftDeletable> = new Schema(
    {
        deleted: { type: Boolean, default: false },

    }
);