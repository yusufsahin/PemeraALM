
import {IBaseRepository} from "./common/IBaseRepository";
import {IWorkitem} from "../../models/Workitem";
import {FilterQuery} from "mongoose";


export interface IWorkitemRepository extends IBaseRepository<IWorkitem>{
    findAllByProjectId(projectId: string, populate?: string | string[]): Promise<IWorkitem[]>;

}