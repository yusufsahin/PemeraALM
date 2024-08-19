import { inject } from 'inversify';
import { controller, httpGet, httpPost, httpPut, httpDelete, requestParam, requestBody, response } from 'inversify-express-utils';
import { Response } from 'express';
import { RoleService } from '../services/concrete/RoleService';
import { NotFoundError } from '../errors/CustomErrors';
import { RoleDTO } from '../dto/IRoleDTO';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeRoles } from '../middlewares/roleMiddleware';

@controller('/api/roles', authMiddleware, authorizeRoles(['Administrators']))
export class RoleController {
    constructor(
        @inject('IRoleService') private roleService: RoleService
    ) {}

    @httpGet('/')
    public async getAllRoles(@response() res: Response): Promise<void> {
        try {
            const roles = await this.roleService.getAllRoles();
            res.json(roles);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to retrieve roles' });
        }
    }

    @httpGet('/:id')
    public async getRoleById(@requestParam('id') id: string, @response() res: Response): Promise<void> {
        try {
            const role = await this.roleService.getRoleById(id);
            res.json(role);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                const err = error as Error;
                res.status(500).json({ error: err.message || 'Failed to retrieve the role' });
            }
        }
    }

    @httpPost('/')
    public async createRole(@requestBody() roleDTO: RoleDTO, @response() res: Response): Promise<void> {
        try {
            const role = await this.roleService.createOrUpdateRole(roleDTO);
            res.status(201).json(role);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to create role' });
        }
    }

    @httpPut('/:id')
    public async updateRole(@requestParam('id') id: string, @requestBody() roleDTO: RoleDTO, @response() res: Response): Promise<void> {
        try {
            roleDTO._id = id;
            const role = await this.roleService.createOrUpdateRole(roleDTO);
            res.json(role);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to update role' });
        }
    }

    @httpDelete('/:id')
    public async deleteRole(@requestParam('id') id: string, @response() res: Response): Promise<void> {
        try {
            await this.roleService.deleteRoleById(id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                const err = error as Error;
                res.status(500).json({ error: err.message || 'Failed to delete role' });
            }
        }
    }
}
