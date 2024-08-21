import { injectable, inject } from 'inversify';
import { FilterQuery, Model } from 'mongoose';
import { BaseRepository } from "./common/BaseRepository";
import { IWorkitem } from "../../models/Workitem";
import { IWorkitemRepository } from "../abstract/IWorkitemRepository";

@injectable()
export class WorkitemRepository extends BaseRepository<IWorkitem> implements IWorkitemRepository {
    constructor(
        @inject('WorkitemModel') workitemModel: Model<IWorkitem>
    ) {
        super(workitemModel);
    }

    public async findAll(filter: FilterQuery<IWorkitem> = {}): Promise<IWorkitem[]> {
        return this.model.find(filter).exec(); // Remove .populate('tasks')
    }

    public async findById(id: string): Promise<IWorkitem | null> {
        return this.model.findById(id).exec(); // Remove .populate('tasks')
    }
}
