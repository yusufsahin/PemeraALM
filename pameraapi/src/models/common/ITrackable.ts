import { Schema } from 'mongoose';

export interface ITrackable {
    createdBy: string;
    createdAt: Date;
    modifiedBy?: string;
    modifiedAt?: Date;
}

export const TrackableSchema: Schema<ITrackable> = new Schema(
    {
        createdBy: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        modifiedBy: { type: String },
        modifiedAt: { type: Date },
    },
    {
        timestamps: true, // Automatically handles createdAt and updatedAt
    }
);