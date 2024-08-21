import { inject, injectable } from 'inversify';
import { IWorkitemService } from '../abstract/IWorkitemService';
import { IWorkitemDTO } from '../../dto/IWorkitemDTO';
import { IWorkitemRepository } from '../../repositorites/abstract/IWorkitemRepository';
import { ITaskRepository } from '../../repositorites/abstract/ITaskRepository';
import { NotFoundError } from '../../errors/CustomErrors';
import { Types } from 'mongoose';
import { IWorkitem } from '../../models/Workitem';
import {ITask} from "../../models/Task";

@injectable()
export class WorkitemService implements IWorkitemService {
    constructor(
        @inject('IWorkitemRepository') private workitemRepository: IWorkitemRepository,
        @inject('ITaskRepository') private taskRepository: ITaskRepository
    ) {}

    public async createOrUpdateWorkitem(workitemDTO: Partial<IWorkitemDTO>): Promise<IWorkitemDTO> {
        const objectId = workitemDTO._id ? new Types.ObjectId(workitemDTO._id) : new Types.ObjectId();
        if (workitemDTO._id) {
            const updatedWorkitem = await this.workitemRepository.updateById(objectId.toHexString(), this.toEntity(workitemDTO));
            if (!updatedWorkitem) {
                throw new NotFoundError('Work item not found');
            }
            return this.toDTO(updatedWorkitem);
        } else {
            const createdWorkitem = await this.workitemRepository.create(this.toEntity(workitemDTO));
            return this.toDTO(createdWorkitem);
        }
    }

    public async getWorkitemById(id: string): Promise<IWorkitemDTO | null> {
        const workitem = await this.workitemRepository.findById(id);
        if (!workitem) return null;

        // Manually populate tasks by querying the Task model
        const tasks = await this.taskRepository.findAll({ workitem: id });

        return this.toDTO(workitem, tasks);
    }

    public async deleteWorkitemById(id: string): Promise<void> {
        const workitem = await this.workitemRepository.findById(id);
        if (!workitem) {
            throw new NotFoundError('Work item not found');
        }
        await this.workitemRepository.deleteById(id);
    }

    public async getAllWorkitems(): Promise<IWorkitemDTO[]> {
        const workitems = await this.workitemRepository.findAll();
        return Promise.all(workitems.map(async (workitem) => {
            const tasks = await this.taskRepository.findAll({ workitem: workitem._id });
            return this.toDTO(workitem, tasks);
        }));
    }

    public async getWorkitemsByProjectId(projectId: string): Promise<IWorkitemDTO[]> {
        const filter = { project: new Types.ObjectId(projectId) };
        const workitems = await this.workitemRepository.findAll(filter);
        if (!workitems || workitems.length === 0) {
            throw new NotFoundError('No work items found for the specified project');
        }
        return Promise.all(workitems.map(async (workitem) => {
            const tasks = await this.taskRepository.findAll({ workitem: workitem._id });
            return this.toDTO(workitem, tasks);
        }));
    }

    private toDTO(workitem: IWorkitem, tasks: ITask[] = []): IWorkitemDTO {
        return {
            _id: workitem._id.toHexString(),
            id: workitem._id.toHexString(),
            title: workitem.title,
            description: workitem.description || undefined,
            status: workitem.status,
            project: workitem.project instanceof Types.ObjectId
                ? workitem.project.toHexString()
                : (workitem.project as any)._id.toHexString(),
            tasks: tasks.map(task => ({
                _id: task._id.toHexString(),
                id: task._id.toHexString(),
                title: task.title,
                description: task.description || undefined,
                status: task.status,
            })),
        };
    }


    private toEntity(workitemDTO: Partial<IWorkitemDTO>): Partial<IWorkitem> {
        return {
            _id: workitemDTO._id ? new Types.ObjectId(workitemDTO._id) : undefined,
            title: workitemDTO.title || '', // Ensure title is always a string
            description: workitemDTO.description || undefined,
            status: workitemDTO.status || 'New', // Default status if undefined
            project: workitemDTO.project ? new Types.ObjectId(workitemDTO.project) : undefined,
        };
    }
}
