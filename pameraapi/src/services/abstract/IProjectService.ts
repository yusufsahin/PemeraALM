import {IProjectDTO} from "../../dto/IProjectDTO";

export interface IProjectService {
    createOrUpdateProject(project: Partial<IProjectDTO>): Promise<IProjectDTO>;
    getProjectById(id: string): Promise<IProjectDTO | null>;
    deleteProjectById(id: string): Promise<void>;
    getAllProjects(): Promise<IProjectDTO[]>;
}
