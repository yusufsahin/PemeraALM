import {INoteDTO} from "../../dto/INoteDTO";

export interface INoteService {
    getAllNotes(): Promise<INoteDTO[]>;
    getNoteById(id: string): Promise<INoteDTO | null>;
    createOrUpdateNote(noteDTO: INoteDTO): Promise<INoteDTO | null>;
    deleteNoteById(id: string): Promise<void>;
}