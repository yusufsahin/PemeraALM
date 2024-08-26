import { inject, injectable } from 'inversify';
import { ITaskService } from '../abstract/ITaskService';
import { ITaskDTO } from '../../dto/ITaskDTO';
import { NotFoundError } from '../../errors/CustomErrors';
import { Types } from 'mongoose';
import { ITask } from '../../models/Task';
import { IUser } from '../../models/User';
import { IWorkitem } from '../../models/Workitem';
import {TaskRepository} from "../../repositorites/concrete/TaskRepository";

@injectable()
export class TaskService implements ITaskService {
    constructor(
        @inject('ITaskRepository') private taskRepository: TaskRepository
    ) {}

    public async createOrUpdateTask(taskDTO: Partial<ITaskDTO>): Promise<ITaskDTO> {
        if (taskDTO._id) {
            const objectId = Types.ObjectId.isValid(taskDTO._id) ? new Types.ObjectId(taskDTO._id) : new Types.ObjectId();
            const updatedTask = await this.taskRepository.updateById(objectId.toHexString(), this.toEntity(taskDTO));
            if (!updatedTask) {
                throw new NotFoundError('Task not found');
            }
            return this.toDTO(updatedTask);
        } else {
            const createdTask = await this.taskRepository.create(this.toEntity(taskDTO));
            return this.toDTO(createdTask);
        }
    }

    public async getTaskById(id: string, populate: string[] = ['assignTo']): Promise<ITaskDTO | null> {
        const task = await this.taskRepository.findById(id, populate);
        return task ? this.toDTO(task) : null;
    }

    public async deleteTaskById(id: string): Promise<void> {
        const task = await this.taskRepository.findById(id, ['assignTo']);
        if (!task) {
            throw new NotFoundError('Task not found');
        }
        await this.taskRepository.deleteById(id);
    }

    public async getAllTasks(populate: string[] = ['assignTo']): Promise<ITaskDTO[]> {
        const tasks = await this.taskRepository.findAll({}, populate);
        return tasks.map(task => this.toDTO(task));
    }

    public async findAllByWorkitemId(workitemId: string, populate: string[] = ['assignTo']): Promise<ITaskDTO[]> {
        const tasks = await this.taskRepository.findAll({ workitem: new Types.ObjectId(workitemId) }, populate);
        return tasks.map(task => this.toDTO(task));
    }

    private toDTO(task: ITask): ITaskDTO {
        return {
            _id: task._id.toHexString(),
            id: task._id.toHexString(),
            name: task.name,
            description: task.description || undefined,
            dueDate: task.dueDate || undefined,
            expectedDate: task.expectedDate || undefined,
            actualDate: task.actualDate || undefined,
            hoursExpected: task.hoursExpected || undefined,
            hoursActual: task.hoursActual || undefined,
            assignTo: task.assignTo
                ? task.assignTo instanceof Types.ObjectId
                    ? task.assignTo.toHexString()
                    : (task.assignTo as IUser)._id.toHexString()
                : undefined,
            type: task.type || undefined,
            category: task.category || undefined,
            status: task.status || undefined,
            workitemId: task.workitem
                ? task.workitem instanceof Types.ObjectId
                    ? task.workitem.toHexString()
                    : (task.workitem as IWorkitem)._id.toHexString()
                : undefined,
        };
    }

    private toEntity(taskDTO: Partial<ITaskDTO>): Partial<ITask> {
        return {
            _id: taskDTO._id ? new Types.ObjectId(taskDTO._id) : undefined,
            name: taskDTO.name || '',
            description: taskDTO.description || undefined,
            dueDate: taskDTO.dueDate || undefined,
            expectedDate: taskDTO.expectedDate || undefined,
            actualDate: taskDTO.actualDate || undefined,
            hoursExpected: taskDTO.hoursExpected || undefined,
            hoursActual: taskDTO.hoursActual || undefined,
            assignTo: taskDTO.assignTo ? new Types.ObjectId(taskDTO.assignTo) : undefined,
            type: taskDTO.type as any || undefined,
            category: taskDTO.category as any || undefined,
            status: taskDTO.status as any || undefined,
            workitem: taskDTO.workitemId ? new Types.ObjectId(taskDTO.workitemId) : undefined,
        };
    }
}
