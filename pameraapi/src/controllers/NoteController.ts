import { controller, httpGet, request, response, queryParam } from 'inversify-express-utils';
import { Request, Response } from 'express';
import {NoteService} from "../services/concrete/NoteService";

@controller('/api/notes')
export class NoteController {
    constructor(private noteService: NoteService) {}

    @httpGet('/')
    public async getAllNotes(@response() res: Response): Promise<void> {
        const notes = await this.noteService.getAllNotes();
        res.json(notes);
    }

    @httpGet('/search')
    public async searchNotes(
        @queryParam('filter') filter: string | undefined,
        @queryParam('page') page: number | undefined,
        @queryParam('size') size: number | undefined,
        @queryParam('sortBy') sortBy: string | undefined,
        @queryParam('sortOrder') sortOrder: 'asc' | 'desc' | undefined,
        @response() res: Response
    ): Promise<void> {
        const parsedFilter = filter ? JSON.parse(filter) : {};
        const notes = await this.noteService.searchNotes(parsedFilter, page, size, sortBy, sortOrder);
        res.json(notes);
    }

    @httpGet('/:id')
    public async getNoteById(@request() req: Request, @response() res: Response): Promise<void> {
        const note = await this.noteService.getNoteById(req.params.id);
        if (note) {
            res.json(note);
        } else {
            res.status(404).send('Note not found');
        }
    }
}
