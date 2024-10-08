import { controller, httpGet, httpPost, httpPut, httpDelete, requestParam, requestBody, response, queryParam } from 'inversify-express-utils';
import { Response } from 'express';
import { NoteService } from '../services/concrete/NoteService';
import { INoteDTO } from '../dto/INoteDTO';
import { NotFoundError } from '../errors/CustomErrors';
import { inject } from 'inversify';
import { authenticationMiddleware } from '../middlewares/authenticationMiddleware';
import { authorizationMiddleware } from '../middlewares/authorizationMiddleware';

@controller('/api/notes', authenticationMiddleware)
export class NoteController {
    constructor(@inject('INoteService') private noteService: NoteService) {}

    @httpGet('/', authorizationMiddleware(['Administrators', 'Members'], ['READ_PRIVILEGE']))
    public async getAllNotes(@response() res: Response): Promise<void> {
        try {
            const notes = await this.noteService.getAllNotes();
            res.json(notes);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to retrieve notes' });
        }
    }

    @httpGet('/:id', authorizationMiddleware(['Administrators', 'Members'], ['READ_PRIVILEGE']))
    public async getNoteById(@requestParam('id') id: string, @response() res: Response): Promise<void> {
        try {
            const note = await this.noteService.getNoteById(id);
            res.json(note);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                const err = error as Error;
                res.status(500).json({ error: err.message || 'Failed to retrieve the note' });
            }
        }
    }

    @httpGet('/search', authorizationMiddleware(['Administrators', 'Members'], ['READ_PRIVILEGE']))
    public async searchNotes(
        @queryParam('filter') filter: string | undefined,
        @queryParam('page') page: number | undefined,
        @queryParam('size') size: number | undefined,
        @queryParam('sortBy') sortBy: string | undefined,
        @queryParam('sortOrder') sortOrder: 'asc' | 'desc' | undefined,
        @response() res: Response
    ): Promise<void> {
        try {
            const parsedFilter = filter ? JSON.parse(filter) : {};
            const notes = await this.noteService.searchNotes(parsedFilter, page, size, sortBy, sortOrder);
            res.json(notes);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to search notes' });
        }
    }

    @httpPost('/', authorizationMiddleware(['Administrators'], ['WRITE_PRIVILEGE']))
    public async createNote(@requestBody() noteDTO: INoteDTO, @response() res: Response): Promise<void> {
        try {
            if (!noteDTO.title || !noteDTO.content) {
                res.status(400).json({ error: 'Title and content are required' });
                return;
            }
            const note = await this.noteService.createOrUpdateNote(noteDTO);
            res.status(201).json(note);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to create note' });
        }
    }

    @httpPut('/:id', authorizationMiddleware(['Administrators'], ['WRITE_PRIVILEGE']))
    public async updateNote(@requestParam('id') id: string, @requestBody() noteDTO: INoteDTO, @response() res: Response): Promise<void> {
        try {
            noteDTO._id = id;
            const note = await this.noteService.createOrUpdateNote(noteDTO);
            if (note) {
                res.json(note);
            } else {
                res.status(404).json({ error: 'Note not found' });
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to update note' });
        }
    }

    @httpDelete('/:id', authorizationMiddleware(['Administrators'], ['DELETE_PRIVILEGE']))
    public async deleteNote(@requestParam('id') id: string, @response() res: Response): Promise<void> {
        try {
            await this.noteService.deleteNoteById(id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                const err = error as Error;
                res.status(500).json({ error: err.message || 'Failed to delete note' });
            }
        }
    }
}
