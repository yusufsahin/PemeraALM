// src/services/NoteService.ts
import { injectable } from 'inversify';

import { INoteEntity } from '../models/NoteEntity';
import {NoteRepository} from "../repositorites/NoteRepository";
import {NoteDTO} from "../dto/NoteDTO";

@injectable()
export class NoteService {
    constructor(private noteRepository: NoteRepository) {}

    public async getAllNotes(): Promise<INoteEntity[]> {
        return this.noteRepository.findAll();
    }

    public async getNoteById(id: string): Promise<INoteEntity | null> {
        return this.noteRepository.findById(id);
    }

    public async createOrUpdateNote(noteDTO: NoteDTO): Promise<INoteEntity | null> {
        if (noteDTO._id) {
            return this.noteRepository.updateById(noteDTO._id, noteDTO);
        } else {
            return this.noteRepository.create(noteDTO);
        }
    }

    public async deleteNoteById(id: string): Promise<void> {
        await this.noteRepository.deleteById(id);
    }
}