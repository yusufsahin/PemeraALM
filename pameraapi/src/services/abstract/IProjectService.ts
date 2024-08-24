import {IProjectDTO} from "../../dto/IProjectDTO";


export interface IProjectService {
    // Create a new project with the provided details
    createProject(projectDTO: IProjectDTO): Promise<IProjectDTO>;

    // Update an existing project by its ID with the provided details
    updateProject(projectId: string, projectDTO: IProjectDTO): Promise<IProjectDTO | null>;

    // Retrieve a project by its ID
    getProjectById(projectId: string): Promise<IProjectDTO | null>;

    // List all projects in the system
    listAllProjects(): Promise<IProjectDTO[]>;

    // Soft delete a project by its ID
    deleteProject(projectId: string): Promise<void>;
}
