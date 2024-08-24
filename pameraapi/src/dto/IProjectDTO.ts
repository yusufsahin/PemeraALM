import { ProjectStatus } from "../enums/ProjectStatus";

export interface IProjectDTO {
    _id?: string;             // Optional for creating a new project, required for updates
    id?: string;              // Virtual field that maps to _id for client use
    name: string;             // Project name
    description?: string;     // Optional description of the project
    memo?: string;            // Optional memo field for additional notes
    scope?: string;           // Optional scope of the project
    projectManager?: string;  // Optional field for the name of the project manager
    projectAssistant?: string; // Optional field for the name of the project assistant
    startDate?: Date;         // Project start date
    finishDate?: Date;           // Optional end date for the project
    status?: ProjectStatus;   // Project status
}
