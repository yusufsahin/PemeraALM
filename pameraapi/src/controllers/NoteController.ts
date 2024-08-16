import { controller, httpGet, httpPost, httpPut, httpDelete, requestParam, requestBody, response } from 'inversify-express-utils';
import { Response } from 'express';
import { NoteService } from '../services/NoteService';
import {INoteDTO} from "../dto/INoteDTO";


@controller('/api/notes')
export class NoteController {
    constructor(private noteService: NoteService) {}

    @httpGet('/')
    public async getAllNotes(@response() res: Response): Promise<void> {
        const notes = await this.noteService.getAllNotes();
        res.json(notes);
    }

    @httpGet('/:id')
    public async getNote(@requestParam('id') id: string, @response() res: Response): Promise<void> {
        const note = await this.noteService.getNoteById(id);
        if (note) {
            res.json(note);
        } else {
            res.status(404).send('Note not found');
        }
    }

    @httpPost('/')
    public async createNote(@requestBody() noteDTO: INoteDTO, @response() res: Response): Promise<void> {
        const note = await this.noteService.createOrUpdateNote(noteDTO);
        res.status(201).json(note);
    }

    @httpPut('/:id')
    public async updateNote(@requestParam('id') id: string, @requestBody() noteDTO: INoteDTO, @response() res: Response): Promise<void> {
        noteDTO._id = id; // Set the _id from the URL parameter
        const note = await this.noteService.createOrUpdateNote(noteDTO);
        if (note) {
            res.json(note);
        } else {
            res.status(404).send('Note not found');
        }
    }

    @httpDelete('/:id')
    public async deleteNote(@requestParam('id') id: string, @response() res: Response): Promise<void> {
        await this.noteService.deleteNoteById(id);
        res.status(204).send();
    }
}
