import { IWorkitemDTO } from '../../dto/IWorkitemDTO';
import { ITaskDTO } from '../../dto/ITaskDTO';

export interface IWorkitemService {
    createOrUpdateWorkitem(workitemDTO: Partial<IWorkitemDTO>): Promise<IWorkitemDTO>;
    getWorkitemById(id: string): Promise<IWorkitemDTO | null>;
    deleteWorkitemById(id: string): Promise<void>;
    getAllWorkitems(): Promise<IWorkitemDTO[]>;
      getWorkitemsByProjectId(projectId: string): Promise<IWorkitemDTO[]>;
}
