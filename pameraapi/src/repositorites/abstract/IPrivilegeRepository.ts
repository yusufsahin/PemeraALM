import { IPrivilege } from "../../models/Privilege";
import { IBaseRepository } from "./common/IBaseRepository";
import {Types} from "mongoose";

export interface IPrivilegeRepository extends IBaseRepository<IPrivilege> {
    findByName(name: string): Promise<IPrivilege | null>;
    findByIds(ids: Types.ObjectId[]): Promise<IPrivilege[]>;

}
