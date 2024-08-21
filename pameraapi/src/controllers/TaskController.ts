import { controller, httpGet, httpPost, httpPut, httpDelete, requestParam, requestBody, response } from 'inversify-express-utils';
import { Response } from 'express';
import { inject } from 'inversify';
import { ITaskService } from '../services/abstract/ITaskService';
import { ITaskDTO } from '../dto/ITaskDTO';
import { NotFoundError } from '../errors/CustomErrors';

@controller('/api/tasks')
export class TaskController {
    constructor(
        @inject('ITaskService') private taskService: ITaskService
    ) {}

    @httpGet('/')
    public async getAllTasks(@response() res: Response): Promise<void> {
        try {
            const tasks = await this.taskService.getAllTasks();
            res.json(tasks);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to retrieve tasks' });
        }
    }

    @httpGet('/:id')
    public async getTaskById(@requestParam('id') id: string, @response() res: Response): Promise<void> {
        try {
            const task = await this.taskService.getTaskById(id);
            if (task) {
                res.json(task);
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to retrieve the task' });
        }
    }

    @httpPost('/')
    public async createTask(@requestBody() taskDTO: ITaskDTO, @response() res: Response): Promise<void> {
        try {
            const task = await this.taskService.createOrUpdateTask(taskDTO);
            res.status(201).json(task);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to create the task' });
        }
    }

    @httpPut('/:id')
    public async updateTask(@requestParam('id') id: string, @requestBody() taskDTO: ITaskDTO, @response() res: Response): Promise<void> {
        try {
            taskDTO._id = id;
            const task = await this.taskService.createOrUpdateTask(taskDTO);
            if (task) {
                res.json(task);
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message || 'Failed to update the task' });
        }
    }

    @httpDelete('/:id')
    public async deleteTask(@requestParam('id') id: string, @response() res: Response): Promise<void> {
        try {
            await this.taskService.deleteTaskById(id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                const err = error as Error;
                res.status(500).json({ error: err.message || 'Failed to delete the task' });
            }
        }
    }
}
