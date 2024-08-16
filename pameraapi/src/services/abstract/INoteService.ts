import {INoteDTO} from "../../dto/INoteDTO";


export interface INoteService {
    getAllNotes(): Promise<INoteDTO[]>;
    searchNotes(
        filter?: Partial<Record<keyof INoteDTO, any>>,
        page?: number,
        size?: number,
        sortBy?: string,
        sortOrder?: 'asc' | 'desc'
    ): Promise<INoteDTO[]>;
    getNoteById(id: string): Promise<INoteDTO | null>;
    createOrUpdateNote(noteDTO: INoteDTO): Promise<INoteDTO | null>;
    deleteNoteById(id: string): Promise<void>;
}
