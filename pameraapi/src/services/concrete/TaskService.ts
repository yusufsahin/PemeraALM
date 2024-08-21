import { inject, injectable } from 'inversify';
import { ITaskService } from '../abstract/ITaskService';
import { ITaskDTO } from '../../dto/ITaskDTO';
import { ITaskRepository } from '../../repositorites/abstract/ITaskRepository';
import { NotFoundError } from '../../errors/CustomErrors';
import { Types } from 'mongoose';
import { ITask } from '../../models/Task';

@injectable()
export class TaskService implements ITaskService {
    constructor(
        @inject('ITaskRepository') private taskRepository: ITaskRepository
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

    public async getTaskById(id: string): Promise<ITaskDTO | null> {
        const task = await this.taskRepository.findById(id);
        return task ? this.toDTO(task) : null;
    }

    public async deleteTaskById(id: string): Promise<void> {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new NotFoundError('Task not found');
        }
        await this.taskRepository.deleteById(id);
    }

    public async getAllTasks(): Promise<ITaskDTO[]> {
        const tasks = await this.taskRepository.findAll();
        return tasks.map(task => this.toDTO(task));
    }

    private toDTO(task: ITask): ITaskDTO {
        return {
            _id: task._id.toHexString(),
            id: task._id.toHexString(),
            title: task.title,
            description: task.description || undefined,
            status: task.status,
            assignee: task.assignee,
            dueDate: task.dueDate,
            workitem: task.workitem ? task.workitem.toHexString() : undefined,
        };
    }

    private toEntity(taskDTO: Partial<ITaskDTO>): Partial<ITask> {
        return {
            _id: taskDTO._id ? new Types.ObjectId(taskDTO._id) : undefined,
            title: taskDTO.title || '',
            description: taskDTO.description || undefined,
            status: taskDTO.status || 'Pending', // Default status
            assignee: taskDTO.assignee || undefined,
            dueDate: taskDTO.dueDate || undefined,
            workitem: taskDTO.workitem ? new Types.ObjectId(taskDTO.workitem) : undefined, // Convert workitem to ObjectId
        };
    }
}
