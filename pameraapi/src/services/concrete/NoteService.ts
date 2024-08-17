import { injectable } from 'inversify';

import { NotFoundError, ValidationError } from "../../errors/CustomErrors";
import {INote} from "../../models/Note";
import {NoteRepository} from "../../repositorites/concrete/NoteRepository";
import {INoteDTO} from "../../dto/INoteDTO";
import {INoteService} from "../abstract/INoteService";

@injectable()
export class NoteService implements  INoteService{
    constructor(private noteRepository: NoteRepository) {}

    public async getAllNotes(): Promise<INoteDTO[]> {
        const notes = await this.noteRepository.findAll();
        return notes.map(note => this.toDTO(note));
    }

    public async getNoteById(id: string): Promise<INoteDTO | null> {
        const note = await this.noteRepository.findById(id);
        if (!note) {
            throw new NotFoundError('Note not found');
        }
        return this.toDTO(note);
    }

    public async createOrUpdateNote(noteDTO: INoteDTO): Promise<INoteDTO | null> {
        if (!noteDTO.title || !noteDTO.content) {
            throw new ValidationError('Title and content are required');
        }

        if (noteDTO._id) {
            const updatedNote = await this.noteRepository.updateById(noteDTO._id, noteDTO);
            if (!updatedNote) {
                throw new NotFoundError('Note not found');
            }
            return this.toDTO(updatedNote);
        } else {
            const createdNote = await this.noteRepository.create(noteDTO);
            return this.toDTO(createdNote);
        }
    }

    public async deleteNoteById(id: string): Promise<void> {
        const note = await this.noteRepository.findById(id);
        if (!note) {
            throw new NotFoundError('Note not found');
        }
        await this.noteRepository.deleteById(id);
    }

    private toDTO(note: INote): INoteDTO {
        return {
            _id: note._id?.toString(),  // Ensure _id is converted to string
            title: note.title,
            content: note.content
        };
    }
    public async searchNotes(
        filter?: Partial<Record<keyof INoteDTO, any>>,
        page?: number,
        size?: number,
        sortBy?: string,
        sortOrder?: 'asc' | 'desc'
    ): Promise<INoteDTO[]> {
        const notes = await this.noteRepository.search(filter, page, size, sortBy, sortOrder);
        return notes.map(note => this.toDTO(note));
    }
}
