export interface IBaseRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    create(item: Partial<T>): Promise<T>;
    updateById(id: string, item: Partial<T>): Promise<T | null>;
    deleteById(id: string): Promise<void>;
}
