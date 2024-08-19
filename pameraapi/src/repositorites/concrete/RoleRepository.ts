import { injectable, inject } from 'inversify';
import { Model } from 'mongoose';
import { IRoleRepository } from '../abstract/IRoleRepository';
import { IRole } from '../../models/Role';
import { BaseRepository } from './common/BaseRepository';

@injectable()
export class RoleRepository extends BaseRepository<IRole> implements IRoleRepository {
    constructor(
        @inject('RoleModel') private roleModel: Model<IRole>
    ) {
        super(roleModel);
    }

    public async findByName(name: string): Promise<IRole | null> {
        return this.roleModel.findOne({ name, deleted: false }).exec();
    }
}
