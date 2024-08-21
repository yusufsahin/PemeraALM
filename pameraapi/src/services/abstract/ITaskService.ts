import { ITaskDTO } from '../../dto/ITaskDTO';

export interface ITaskService {
    createOrUpdateTask(taskDTO: Partial<ITaskDTO>): Promise<ITaskDTO>;
    getTaskById(id: string): Promise<ITaskDTO | null>;
    deleteTaskById(id: string): Promise<void>;
    getAllTasks(): Promise<ITaskDTO[]>;
}
