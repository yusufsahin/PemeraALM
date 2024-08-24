import { controller, httpGet, httpPost, httpPut, httpDelete, requestParam, requestBody, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { IProjectService } from '../services/abstract/IProjectService';
import { IProjectDTO } from '../dto/IProjectDTO';
import { Response } from 'express';

@controller('/api/projects')
export class ProjectController {
    constructor(
        @inject('IProjectService') private projectService: IProjectService
    ) {}

    @httpGet('/')
    public async listAllProjects(@response() res: Response): Promise<Response> { // Use the @response decorator to get the Response object
        try {
            const projects = await this.projectService.listAllProjects();
            return res.status(200).json(projects);
        } catch (error) {
            return this.handleError(res, error, 'Error fetching projects');
        }
    }

    @httpGet('/:id')
    public async getProjectById(@requestParam('id') id: string, @response() res: Response): Promise<Response> { // Use the @response decorator to get the Response object
        try {
            const project = await this.projectService.getProjectById(id);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            return res.status(200).json(project);
        } catch (error) {
            return this.handleError(res, error, 'Error fetching project');
        }
    }

    @httpPost('/')
    public async createProject(@requestBody() projectDTO: IProjectDTO, @response() res: Response): Promise<Response> { // Use the @response decorator to get the Response object
        try {
            const createdProject = await this.projectService.createProject(projectDTO);
            return res.status(201).json(createdProject);
        } catch (error) {
            return this.handleError(res, error, 'Error creating project');
        }
    }

    @httpPut('/:id')
    public async updateProject(@requestParam('id') id: string, @requestBody() projectDTO: IProjectDTO, @response() res: Response): Promise<Response> { // Use the @response decorator to get the Response object
        try {
            const updatedProject = await this.projectService.updateProject(id, projectDTO);
            if (!updatedProject) {
                return res.status(404).json({ message: 'Project not found' });
            }
            return res.status(200).json(updatedProject);
        } catch (error) {
            return this.handleError(res, error, 'Error updating project');
        }
    }

    @httpDelete('/:id')
    public async deleteProject(@requestParam('id') id: string, @response() res: Response): Promise<Response> { // Use the @response decorator to get the Response object
        try {
            await this.projectService.deleteProject(id);
            return res.status(200).json({ message: 'Project deleted' });
        } catch (error) {
            return this.handleError(res, error, 'Error deleting project');
        }
    }

    private handleError(res: Response, error: any, customMessage: string): Response {
        console.error(`${customMessage}:`, error.message || error);
        return res.status(500).json({
            message: customMessage,
            details: error.message || 'An unknown error occurred',
        });
    }
}
