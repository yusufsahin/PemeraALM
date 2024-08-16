import {INoteEntity} from "../../models/NoteEntity";

export interface INoteRepository {
    findAll(): Promise<INoteEntity[]>;
    findById(id: string): Promise<INoteEntity | null>;
    create(note: Partial<INoteEntity>): Promise<INoteEntity>;
    updateById(id: string, note: Partial<INoteEntity>): Promise<INoteEntity | null>;
    deleteById(id: string): Promise<void>;
}