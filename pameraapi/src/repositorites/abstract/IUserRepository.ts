import {IUser} from "../../models/User";
import {IBaseRepository} from "./common/IBaseRepository";


export interface IUserRepository extends IBaseRepository<IUser>{
    findOne(filter: Partial<IUser>): Promise<IUser | null>;
}