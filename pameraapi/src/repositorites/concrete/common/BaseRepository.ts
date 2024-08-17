import { injectable, inject } from 'inversify';
import { Model, SortOrder } from 'mongoose';
import { IBaseRepository } from "../../abstract/common/IBaseRepository";
import { IBaseModel } from "../../../models/common/IBaseModel";
import { ISoftDeletable } from "../../../models/common/ISoftDeletable";
import {ITrackable} from "../../../models/common/ITrackable";

@injectable()
export class BaseRepository<T extends IBaseModel & ISoftDeletable & ITrackable> implements IBaseRepository<T> {
    protected model: Model<T>;

    constructor(@inject(Model) model: Model<T>) {
        this.model = model;
    }

    public async findAll(): Promise<T[]> {
        return this.model.find({ deleted: false }).exec(); // Only return non-deleted records
    }

    public async findById(id: string): Promise<T | null> {
        return this.model.findOne({ _id: id, deleted: false }).exec(); // Only return non-deleted records
    }

    public async create(item: Partial<T>): Promise<T> {
        item.createdAt = new Date();
        item.createdBy = 'system';
        item.modifiedAt = new Date();
        item.modifiedBy = 'system';
        return new this.model(item).save();
    }

    public async updateById(id: string, item: Partial<T>): Promise<T | null> {
        item.modifiedAt = new Date();
        item.modifiedBy = 'system';
        return this.model.findOneAndUpdate({ _id: id, deleted: false }, item, { new: true }).exec(); // Only update non-deleted records
    }

    public async deleteById(id: string): Promise<void> {
        await this.model.findByIdAndUpdate(id, { deleted: true }, { new: true }).exec(); // Soft delete by setting 'deleted' to true
    }

    public async search(
        filter: Partial<Record<keyof T, any>> = {},
        page: number = 1,
        size: number = 10,
        sortBy: string = '_id',
        sortOrder: 'asc' | 'desc' = 'asc'
    ): Promise<T[]> {
        const skip = (page - 1) * size;
        const sort: { [key: string]: SortOrder } = { [sortBy]: sortOrder === 'asc' ? 'asc' : 'desc' };

        // Include the filter for non-deleted records
        return this.model.find({ ...filter, deleted: false }).sort(sort).skip(skip).limit(size).exec();
    }
}
