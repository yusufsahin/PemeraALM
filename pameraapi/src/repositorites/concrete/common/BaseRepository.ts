import { injectable } from 'inversify';
import { Document, Model,SortOrder } from 'mongoose';
import { IBaseRepository } from "../../abstract/common/IBaseRepository";

@injectable()
export class BaseRepository<T extends Document> implements IBaseRepository<T> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    public async findAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    public async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    public async create(item: Partial<T>): Promise<T> {
        return new this.model(item).save();
    }

    public async updateById(id: string, item: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, item, { new: true }).exec();
    }

    public async deleteById(id: string): Promise<void> {
        await this.model.findByIdAndDelete(id).exec();
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

        return this.model.find(filter).sort(sort).skip(skip).limit(size).exec();
    }
}
