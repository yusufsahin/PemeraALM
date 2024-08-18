import { injectable, inject } from 'inversify';
import { Model } from 'mongoose';
import { INote, Note} from '../../models/Note';
import { INoteRepository } from '../abstract/INoteRepository';
import {BaseRepository} from "./common/BaseRepository";


@injectable()
export class NoteRepository extends BaseRepository<INote> implements INoteRepository {
    constructor(
        @inject('NoteModel') noteModel: Model<INote>
    ) {
        super(noteModel);
    }


    // You can add specific methods related to NoteEntity here if needed
}
