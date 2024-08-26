import { controller, httpGet, httpPost, httpPut, httpDelete, requestParam, requestBody, response, queryParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import { IWorkitemDTO } from '../dto/IWorkitemDTO';
import { Response } from 'express';
import {WorkitemService} from "../services/concrete/WorkitemService";

@controller('/api/workitems')
export class WorkitemController {
    constructor(
        @inject('IWorkitemService') private workitemService: WorkitemService
    ) {}

    @httpGet('/')
    public async listAllWorkitems(
        @queryParam('projectId') projectId: string | undefined,
        @response() res: Response
    ): Promise<Response> {
        try {
            let workitems;
            if (projectId) {
                workitems = await this.workitemService.findAllByProjectId(projectId);
            } else {
                workitems = await this.workitemService.listAllWorkitems();
            }
            return res.status(200).json(workitems);
        } catch (error) {
            return this.handleError(res, error, 'Error fetching work items');
        }
    }

    @httpGet('/:id')
    public async getWorkitemById(@requestParam('id') id: string, @response() res: Response): Promise<Response> {
        try {
            const workitem = await this.workitemService.getWorkitemById(id);
            if (!workitem) {
                return res.status(404).json({ message: 'Work item not found' });
            }
            return res.status(200).json(workitem);
        } catch (error) {
            return this.handleError(res, error, 'Error fetching work item');
        }
    }

    @httpPost('/')
    public async createWorkitem(@requestBody() workitemDTO: IWorkitemDTO, @response() res: Response): Promise<Response> {
        try {
            const createdWorkitem = await this.workitemService.createWorkitem(workitemDTO);
            return res.status(201).json(createdWorkitem);
        } catch (error) {
            return this.handleError(res, error, 'Error creating work item');
        }
    }

    @httpPut('/:id')
    public async updateWorkitem(@requestParam('id') id: string, @requestBody() workitemDTO: IWorkitemDTO, @response() res: Response): Promise<Response> {
        try {
            const updatedWorkitem = await this.workitemService.updateWorkitem(id, workitemDTO);
            if (!updatedWorkitem) {
                return res.status(404).json({ message: 'Work item not found' });
            }
            return res.status(200).json(updatedWorkitem);
        } catch (error) {
            return this.handleError(res, error, 'Error updating work item');
        }
    }

    @httpDelete('/:id')
    public async deleteWorkitem(@requestParam('id') id: string, @response() res: Response): Promise<Response> {
        try {
            await this.workitemService.deleteWorkitem(id);
            return res.status(204).send(); // 204 No Content
        } catch (error) {
            return this.handleError(res, error, 'Error deleting work item');
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
