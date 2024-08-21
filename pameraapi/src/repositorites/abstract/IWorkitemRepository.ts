
import {IBaseRepository} from "./common/IBaseRepository";
import {IWorkitem} from "../../models/Workitem";
import {FilterQuery} from "mongoose";


export interface IWorkitemRepository extends IBaseRepository<IWorkitem>{
    findAll(filter?: FilterQuery<IWorkitem>): Promise<IWorkitem[]>;

}