import { injectable } from 'inversify';
import { INoteEntity } from '../models/NoteEntity';
import { NoteDTO } from '../dto/NoteDTO';

import {NoteRepository} from "../repositorites/NoteRepository";
import {NotFoundError, ValidationError} from "../middleware/ErrorHandler";

@injectable()
export class NoteService {
    constructor(private noteRepository: NoteRepository) {}

    public async getAllNotes(): Promise<INoteEntity[]> {
        return this.noteRepository.findAll();
    }

    public async getNoteById(id: string): Promise<INoteEntity | null> {
        const note = await this.noteRepository.findById(id);
        if (!note) {
            throw new NotFoundError('Note not found');
        }
        return note;
    }

    public async createOrUpdateNote(noteDTO: NoteDTO): Promise<INoteEntity | null> {
        if (!noteDTO.title || !noteDTO.content) {
            throw new ValidationError('Title and content are required');
        }

        if (noteDTO._id) {
            const updatedNote = await this.noteRepository.updateById(noteDTO._id, noteDTO);
            if (!updatedNote) {
                throw new NotFoundError('Note not found');
            }
            return updatedNote;
        } else {
            return this.noteRepository.create(noteDTO);
        }
    }

    public async deleteNoteById(id: string): Promise<void> {
        const note = await this.noteRepository.findById(id);
        if (!note) {
            throw new NotFoundError('Note not found');
        }
        await this.noteRepository.deleteById(id);
    }
}
