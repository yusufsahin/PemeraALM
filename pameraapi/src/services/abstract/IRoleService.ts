import {RoleDTO} from "../../dto/IRoleDTO";
import {IRole} from "../../models/Role";


export interface IRoleService {
    getAllRoles(): Promise<RoleDTO[]>;
    getRoleById(id: string): Promise<RoleDTO | null>;
    createOrUpdateRole(roleDTO: RoleDTO): Promise<RoleDTO | null>;
    deleteRoleById(id: string): Promise<void>;
    findOne(filter: Partial<IRole>): Promise<IRole | null>;
}
