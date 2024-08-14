// src/repositories/NoteRepository.ts
import { injectable } from 'inversify';
import { NoteEntity, INoteEntity } from '../models/NoteEntity';

@injectable()
export class NoteRepository {
    public async findAll(): Promise<INoteEntity[]> {
        return NoteEntity.find().exec();
    }

    public async findById(id: string): Promise<INoteEntity | null> {
        return NoteEntity.findById(id).exec();
    }

    public async create(note: Partial<INoteEntity>): Promise<INoteEntity> {
        return new NoteEntity(note).save();
    }

    public async updateById(id: string, note: Partial<INoteEntity>): Promise<INoteEntity | null> {
        return NoteEntity.findByIdAndUpdate(id, note, { new: true }).exec();
    }

    public async deleteById(id: string): Promise<void> {
        await NoteEntity.findByIdAndDelete(id).exec();
    }
}