import { Request, Response } from 'express';
import { controller, httpGet, httpPost, httpPut, httpDelete, requestParam, requestBody } from 'inversify-express-utils';
import { inject } from 'inversify';
import { IUserDTO } from '../dto/IUserDTO';
import { IUpdateUserDTO } from '../dto/IUpdateUserDTO';
import { IUserService } from '../services/abstract/IUserService';
import { authorizationMiddleware } from '../middlewares/authorizationMiddleware';
  /*
  @controller('/projects')
export class ProjectController {
    constructor(
        @inject('IProjectService') private projectService: IProjectService
    ) {}


   */
@controller('/api/users')
export class UserController {
    constructor(
        @inject('IUserService') private readonly userService: IUserService
    ) {}

    @httpGet('/')
    public async getAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.userService.listAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ message: 'Failed to fetch users', error: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    @httpGet('/:id')
    public async getUserById(@requestParam('id') userId: string, res: Response): Promise<Response> {
        try {
            const user = await this.userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            return res.status(500).json({ message: 'Failed to fetch the user', error: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    @httpPost('/')
    public async createUser(@requestBody() userDTO: IUserDTO, res: Response): Promise<Response> {
        try {
            if (!userDTO.username || !userDTO.email || !userDTO.firstname || !userDTO.lastname) {
                return res.status(400).json({ message: 'Missing required user fields' });
            }

            const createdUser = await this.userService.createUser(userDTO);
            return res.status(201).json(createdUser);
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ message: 'Failed to create the user', error: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    @httpPut('/:id')
    public async updateUser(
        @requestParam('id') userId: string,
        @requestBody() updateUserDTO: IUpdateUserDTO,
        res: Response
    ): Promise<Response> {
        try {
            if (!updateUserDTO.username && !updateUserDTO.email && !updateUserDTO.firstname && !updateUserDTO.lastname) {
                return res.status(400).json({ message: 'No fields to update provided' });
            }

            const updatedUser = await this.userService.updateUser(userId, updateUserDTO);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ message: 'Failed to update the user', error: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    @httpDelete('/:id')
    public async deleteUser(@requestParam('id') userId: string, res: Response): Promise<Response> {
        try {
            await this.userService.deleteUser(userId);
            return res.status(204).send();
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Failed to delete the user', error: error instanceof Error ? error.message : 'Unknown error' });
        }
    }
}
