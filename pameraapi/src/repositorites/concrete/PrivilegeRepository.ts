import {Model, Types} from 'mongoose';
import { inject, injectable } from 'inversify';
import { IPrivilege } from '../../models/Privilege';
import { IPrivilegeRepository } from '../abstract/IPrivilegeRepository';
import { BaseRepository } from './common/BaseRepository';

@injectable()
export class PrivilegeRepository extends BaseRepository<IPrivilege> implements IPrivilegeRepository {
    constructor(@inject('PrivilegeModel') private privilegeModel: Model<IPrivilege>) {
        super(privilegeModel);  // Pass the model to the base repository
    }

    public async findByName(name: string): Promise<IPrivilege | null> {
        return this.privilegeModel.findOne({ name, deleted: false }).exec();
    }

    async findByIds(ids: Types.ObjectId[]): Promise<IPrivilege[]> {
        return this.privilegeModel.find({ _id: { $in: ids } }).exec();
    }

}
