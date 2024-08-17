import { injectable } from 'inversify';
import { NotFoundError, ValidationError } from '../../errors/CustomErrors';
import { INote } from '../../models/Note';
import { INoteDTO } from '../../dto/INoteDTO';
import { Types } from 'mongoose';
import {NoteRepository} from "../../repositorites/concrete/NoteRepository";

@injectable()
export class NoteService {
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
            const objectId = new Types.ObjectId(noteDTO._id);  // Convert string to ObjectId
            const updatedNote = await this.noteRepository.updateById(objectId.toHexString(), noteDTO as Partial<INote>);
            if (!updatedNote) {
                throw new NotFoundError('Note not found');
            }
            return this.toDTO(updatedNote);
        } else {
            const createdNote = await this.noteRepository.create(noteDTO as Partial<INote>);
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

    public async searchNotes(
        filter: Partial<Record<keyof INoteDTO, any>> = {},
        page: number = 1,
        size: number = 10,
        sortBy: string = '_id',
        sortOrder: 'asc' | 'desc' = 'asc'
    ): Promise<INoteDTO[]> {
        const notes = await this.noteRepository.search(filter, page, size, sortBy, sortOrder);
        return notes.map(note => this.toDTO(note));
    }

    private toDTO(note: INote): INoteDTO {
        return {
            _id: note._id?.toHexString(),
            id: note._id?.toHexString(),
            title: note.title,
            content: note.content
        };
    }
}
