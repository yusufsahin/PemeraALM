import { injectable, inject } from 'inversify';
import { Model, FilterQuery } from 'mongoose';
import { IUserRepository } from '../abstract/IUserRepository';
import { IUser } from '../../models/User';
import { BaseRepository } from './common/BaseRepository';

@injectable()
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor(
        @inject('UserModel') private userModel: Model<IUser>
    ) {
        super(userModel);
    }

    // Override findOne to populate roles
    public async findOne(filter: Partial<IUser>): Promise<IUser | null> {
        return this.userModel.findOne(filter as FilterQuery<IUser>).populate('roles').exec();
    }
}
