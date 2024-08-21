import {FilterQuery} from "mongoose";

export interface IBaseRepository<T> {
    findAll(filter?: FilterQuery<T>, populate?: string | string[]): Promise<T[]>;
    findById(id: string, populate?: string | string[]): Promise<T | null>;
    create(item: Partial<T>): Promise<T>;
    updateById(id: string, item: Partial<T>): Promise<T | null>;
    deleteById(id: string): Promise<void>;
    restoreById(id: string): Promise<T | null>;
    search(
        filter?: Partial<Record<keyof T, any>>,
        page?: number,
        size?: number,
        sortBy?: string,
        sortOrder?: 'asc' | 'desc',
        populate?: string | string[]
    ): Promise<T[]>;
    findOne(filter: FilterQuery<T>, populate?: string | string[]): Promise<T | null>;
}

