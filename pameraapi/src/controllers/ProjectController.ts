import { controller, httpGet, httpPost, httpPut, httpDelete, requestParam, requestBody, response } from 'inversify-express-utils';
import { Response } from 'express';
import { inject } from 'inversify';
import { IProjectService } from '../services/abstract/IProjectService';
import { IProjectDTO } from '../dto/IProjectDTO';
import { authenticationMiddleware } from '../middlewares/authenticationMiddleware';
import { authorizationMiddleware } from '../middlewares/authorizationMiddleware';

@controller('/api/projects', authenticationMiddleware, authorizationMiddleware(['Administrators']))
export class ProjectController {
    constructor(@inject('IProjectService') private projectService: IProjectService) {}

    @httpGet('/')
    public async getAllProjects(@response() res: Response): Promise<void> {
        try {
            const projects = await this.projectService.getAllProjects();
            res.json(projects);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to retrieve projects' });
        }
    }

    @httpGet('/:id')
    public async getProjectById(@requestParam('id') id: string, @response() res: Response): Promise<void> {
        try {
            const project = await this.projectService.getProjectById(id);
            if (project) {
                res.json(project);
            } else {
                res.status(404).json({ error: 'Project not found' });
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to retrieve the project' });
        }
    }

    @httpPost('/')
    public async createProject(@requestBody() projectDTO: Partial<IProjectDTO>, @response() res: Response): Promise<void> {
        try {
            const createdProject = await this.projectService.createOrUpdateProject(projectDTO);
            res.status(201).json(createdProject);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to create the project' });
        }
    }

    @httpPut('/:id')
    public async updateProject(@requestParam('id') id: string, @requestBody() projectDTO: Partial<IProjectDTO>, @response() res: Response): Promise<void> {
        try {
            projectDTO._id = id;
            const updatedProject = await this.projectService.createOrUpdateProject(projectDTO);
            res.json(updatedProject);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to update the project' });
        }
    }

    @httpDelete('/:id')
    public async deleteProject(@requestParam('id') id: string, @response() res: Response): Promise<void> {
        try {
            await this.projectService.deleteProjectById(id);
            res.status(204).send();
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to delete the project' });
        }
    }
}
