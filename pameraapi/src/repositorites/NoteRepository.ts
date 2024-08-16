import { injectable } from 'inversify';
import { NoteEntity, INoteEntity } from '../models/NoteEntity';

@injectable()
export class NoteRepository {
    public async findAll(): Promise<INoteEntity[]> {
        try {
            return await NoteEntity.find().exec();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to retrieve notes: ${error.message}`);
            }
            throw new Error('An unknown error occurred');
        }
    }

    public async findById(id: string): Promise<INoteEntity | null> {
        try {
            return await NoteEntity.findById(id).exec();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to retrieve note by id ${id}: ${error.message}`);
            }
            throw new Error('An unknown error occurred');
        }
    }

    public async create(note: Partial<INoteEntity>): Promise<INoteEntity> {
        try {
            return await new NoteEntity(note).save();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to create note: ${error.message}`);
            }
            throw new Error('An unknown error occurred');
        }
    }

    public async updateById(id: string, note: Partial<INoteEntity>): Promise<INoteEntity | null> {
        try {
            return await NoteEntity.findByIdAndUpdate(id, note, { new: true }).exec();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to update note by id ${id}: ${error.message}`);
            }
            throw new Error('An unknown error occurred');
        }
    }

    public async deleteById(id: string): Promise<void> {
        try {
            await NoteEntity.findByIdAndDelete(id).exec();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to delete note by id ${id}: ${error.message}`);
            }
            throw new Error('An unknown error occurred');
        }
    }
}
