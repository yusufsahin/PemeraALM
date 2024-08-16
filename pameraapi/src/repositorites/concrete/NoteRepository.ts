import { injectable, inject } from 'inversify';
import { Model } from 'mongoose';
import { NoteEntity, INoteEntity } from '../../models/NoteEntity';
import { INoteRepository } from '../abstract/INoteRepository';
import {BaseRepository} from "./common/BaseRepository";


@injectable()
export class NoteRepository extends BaseRepository<INoteEntity> implements INoteRepository {
    constructor(
        @inject(NoteEntity) noteModel: Model<INoteEntity>  // Inject the NoteEntity model
    ) {
        super(noteModel);  // Pass the model to the BaseRepository
    }

    // You can add specific methods related to NoteEntity here if needed
}
