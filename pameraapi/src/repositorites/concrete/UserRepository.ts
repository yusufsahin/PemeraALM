// src/repositories/concrete/UserRepository.ts
import { injectable, inject } from 'inversify';
import { Model} from 'mongoose';
import { IUserRepository } from '../abstract/IUserRepository';
import { IUser } from '../../models/User';
import { BaseRepository } from './common/BaseRepository';
import { FilterQuery } from 'mongoose';

@injectable()
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor(
        @inject('UserModel') private userModel: Model<IUser>  // Use the correct reference here
    ) {
        super(userModel);
    }

    public async findOne(filter: FilterQuery<IUser>): Promise<IUser | null> {
        return this.model.findOne(filter).exec();
    }

    // Other methods...
}
/*

import { injectable, inject } from 'inversify';
import { Model } from 'mongoose';
import { INote} from '../../models/Note';
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

 */