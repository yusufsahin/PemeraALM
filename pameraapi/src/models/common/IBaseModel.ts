import { Schema, Document, Types } from 'mongoose';

export interface IBaseModel extends Document {
    _id: Types.ObjectId; // Mongoose-generated ObjectId
    id: string; // Custom ID mapped to _id
}

const baseModelSchemaFields = {
    // Define base schema fields if needed, e.g., _id is automatically included by Mongoose
};

const baseModelSchemaOptions = {
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (_doc: IBaseModel, ret: Partial<IBaseModel>) => {
            if (ret._id) {
                ret.id = ret._id.toHexString();
            }
            delete ret._id;
        }
    },
    toObject: {
        virtuals: true,
        versionKey: false,
    }
};

export const BaseModelSchema: Schema<IBaseModel> = new Schema(
    baseModelSchemaFields,
    baseModelSchemaOptions
);

// Virtual 'id' field that maps to '_id'
BaseModelSchema.virtual('id')
    .get(function (this: IBaseModel) {
        return this._id.toHexString();
    })
    .set(function (this: IBaseModel, value: string) {
        this._id = new Types.ObjectId(value);
    });
