import { ITaskDTO } from '../../dto/ITaskDTO';

export interface ITaskService {
    createOrUpdateTask(taskDTO: Partial<ITaskDTO>): Promise<ITaskDTO>;
    getTaskById(id: string, populate?: string[]): Promise<ITaskDTO | null>;
    deleteTaskById(id: string): Promise<void>;
    getAllTasks(populate?: string[]): Promise<ITaskDTO[]>;
    findAllByWorkitemId(workitemId: string, populate?: string[]): Promise<ITaskDTO[]>;
}
