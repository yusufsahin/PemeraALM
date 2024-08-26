import { injectable, inject } from 'inversify';
import { Model } from 'mongoose';
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

    public async findAllByProjectId(projectId: string, populate?: string | string[]): Promise<IWorkitem[]> {
        const query = this.model.find({ project: projectId, isDeleted: false });

        if (populate) {
            query.populate(populate);
        }

        return query.exec();
    }
}

