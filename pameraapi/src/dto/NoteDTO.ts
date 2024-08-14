// src/dtos/NoteDTO.ts

export class NoteDTO {
    _id?: string; // Optional for creation, required for updates
    title?: string;
    content?: string;
}