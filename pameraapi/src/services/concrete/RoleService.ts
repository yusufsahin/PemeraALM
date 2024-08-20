import { injectable, inject } from 'inversify';
import { IRoleService } from '../abstract/IRoleService';
;
import { NotFoundError } from '../../errors/CustomErrors';
import {IRoleRepository} from "../../repositorites/abstract/IRoleRepository";
import {RoleDTO} from "../../dto/IRoleDTO";
import {IRole} from "../../models/Role";

@injectable()
export class RoleService implements IRoleService {
    constructor(
        @inject('IRoleRepository') private roleRepository: IRoleRepository
    ) {}

    public async findOne(filter: Partial<IRole>): Promise<IRole | null> {
        return this.roleRepository.findOne(filter);
    }


    public async getAllRoles(): Promise<RoleDTO[]> {
        const roles = await this.roleRepository.findAll();
        return roles.map(role => this.toDTO(role));
    }

    public async getRoleById(id: string): Promise<RoleDTO | null> {
        const role = await this.roleRepository.findById(id);
        if (!role) {
            throw new NotFoundError('Role not found');
        }
        return this.toDTO(role);
    }

    public async createOrUpdateRole(roleDTO: RoleDTO): Promise<RoleDTO | null> {
        if (roleDTO._id) {
            const updatedRole = await this.roleRepository.updateById(roleDTO._id, roleDTO as Partial<IRole>);
            if (!updatedRole) {
                throw new NotFoundError('Role not found');
            }
            return this.toDTO(updatedRole);
        } else {
            const createdRole = await this.roleRepository.create(roleDTO as Partial<IRole>);
            return this.toDTO(createdRole);
        }
    }

    public async deleteRoleById(id: string): Promise<void> {
        await this.roleRepository.deleteById(id);
    }

    private toDTO(role: IRole): RoleDTO {
        return {
            _id: role._id?.toHexString(),
            id: role._id?.toHexString(),
            name: role.name,
            description: role.description,
        };
    }
}
