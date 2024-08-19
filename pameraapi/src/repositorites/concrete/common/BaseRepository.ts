import { injectable, inject } from 'inversify';
import { FilterQuery, Model, SortOrder } from 'mongoose';
import { IBaseRepository } from "../../abstract/common/IBaseRepository";
import { IBaseModel } from "../../../models/common/IBaseModel";
import { ISoftDeletable } from "../../../models/common/ISoftDeletable";
import { ITrackable } from "../../../models/common/ITrackable";
import UserContext from "../../../utils/UserContext";


@injectable()
export class BaseRepository<T extends IBaseModel & ISoftDeletable & ITrackable> implements IBaseRepository<T> {
    protected model: Model<T>;

    constructor(@inject(Model) model: Model<T>) {
        this.model = model;
    }

    private getCurrentUser(): string {
        return UserContext.getUserId(); // Get the user ID from the global context
    }

    public async findAll(): Promise<T[]> {
        return this.model.find({ deleted: false }).exec(); // Only return non-deleted records
    }

    public async findById(id: string): Promise<T | null> {
        return this.model.findOne({ _id: id, deleted: false }).exec(); // Only return non-deleted records
    }

    public async create(item: Partial<T>): Promise<T> {
        const currentUser = this.getCurrentUser();
        const now = new Date();
        item.createdAt = now;
        item.createdBy = currentUser;
        item.modifiedAt = now;
        item.modifiedBy = currentUser;
        return new this.model(item).save();
    }

    public async updateById(id: string, item: Partial<T>): Promise<T | null> {
        const currentUser = this.getCurrentUser();
        item.modifiedAt = new Date();
        item.modifiedBy = currentUser;
        return this.model.findOneAndUpdate({ _id: id, deleted: false }, item, { new: true }).exec(); // Only update non-deleted records
    }

    public async deleteById(id: string): Promise<void> {
        const currentUser = this.getCurrentUser();
        const now = new Date();
        await this.model.findByIdAndUpdate(
            id,
            {
                deleted: true,
                modifiedBy: currentUser,
                modifiedAt: now
            },
            { new: true }
        ).exec();
    }

    public async restoreById(id: string): Promise<T | null> {
        const currentUser = this.getCurrentUser();
        const now = new Date();
        return this.model.findOneAndUpdate(
            { _id: id, deleted: true },
            { deleted: false, modifiedBy: currentUser, modifiedAt: now },
            { new: true }
        ).exec();
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

    public async findOne(filter: FilterQuery<T>): Promise<T | null> {
        return this.model.findOne({ ...filter, deleted: false }).exec(); // Only return non-deleted records
    }
}
