import { IWorkitemDTO } from "../../dto/IWorkitemDTO";

export interface IWorkitemService {
    createWorkitem(workitemDTO: IWorkitemDTO): Promise<IWorkitemDTO>;
    updateWorkitem(workitemId: string, workitemDTO: IWorkitemDTO): Promise<IWorkitemDTO | null>;
    getWorkitemById(workitemId: string): Promise<IWorkitemDTO | null>;
    listAllWorkitems(): Promise<IWorkitemDTO[]>;
    deleteWorkitem(workitemId: string): Promise<void>;
    findAllByProjectId(projectId: string): Promise<IWorkitemDTO[]>;
}
