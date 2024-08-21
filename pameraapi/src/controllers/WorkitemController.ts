import { controller, httpGet, httpPost, httpPut, httpDelete, requestParam, requestBody, response, queryParam } from 'inversify-express-utils';
import { Response } from 'express';
import { inject } from 'inversify';
import { IWorkitemService } from '../services/abstract/IWorkitemService';
import { IWorkitemDTO } from '../dto/IWorkitemDTO';
import { NotFoundError } from '../errors/CustomErrors';

@controller('/api/workitems')
export class WorkitemController {
    constructor(
        @inject('IWorkitemService') private workitemService: IWorkitemService
    ) {}

    @httpGet('/')
    public async getAllWorkitems(@response() res: Response): Promise<void> {
        try {
            const workitems = await this.workitemService.getAllWorkitems();
            res.json(workitems);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to retrieve work items' });
        }
    }

    @httpGet('/:id')
    public async getWorkitemById(@requestParam('id') id: string, @response() res: Response): Promise<void> {
        try {
            const workitem = await this.workitemService.getWorkitemById(id);
            if (workitem) {
                res.json(workitem);
            } else {
                res.status(404).json({ error: 'Work item not found' });
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to retrieve the work item' });
        }
    }

    @httpPost('/')
    public async createWorkitem(@requestBody() workitemDTO: IWorkitemDTO, @response() res: Response): Promise<void> {
        try {
            const workitem = await this.workitemService.createOrUpdateWorkitem(workitemDTO);
            res.status(201).json(workitem);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to create the work item' });
        }
    }

    @httpPut('/:id')
    public async updateWorkitem(@requestParam('id') id: string, @requestBody() workitemDTO: IWorkitemDTO, @response() res: Response): Promise<void> {
        try {
            workitemDTO._id = id;
            const workitem = await this.workitemService.createOrUpdateWorkitem(workitemDTO);
            if (workitem) {
                res.json(workitem);
            } else {
                res.status(404).json({ error: 'Work item not found' });
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to update the work item' });
        }
    }

    @httpDelete('/:id')
    public async deleteWorkitem(@requestParam('id') id: string, @response() res: Response): Promise<void> {
        try {
            await this.workitemService.deleteWorkitemById(id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                const err = error as Error;
                res.status(500).json({ error: err.message || 'Failed to delete the work item' });
            }
        }
    }

    @httpGet('/project/:projectId')
    public async getWorkitemsByProjectId(@requestParam('projectId') projectId: string, @response() res: Response): Promise<void> {
        try {
            const workitems = await this.workitemService.getWorkitemsByProjectId(projectId);
            res.json(workitems);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to retrieve work items for the project' });
        }
    }
}
