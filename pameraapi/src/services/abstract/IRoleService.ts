import {RoleDTO} from "../../dto/IRoleDTO";


export interface IRoleService {
    getAllRoles(): Promise<RoleDTO[]>;
    getRoleById(id: string): Promise<RoleDTO | null>;
    createOrUpdateRole(roleDTO: RoleDTO): Promise<RoleDTO | null>;
    deleteRoleById(id: string): Promise<void>;
}
