import {ProjectStatus} from "../enums/ProjectStatus";

export interface IProjectDTO {
    _id?: string | null;   // Optional for creating a new project, required for updates
    id?: string | null;    // Virtual field that maps to _id for client use
    name: string;          // Project name
    description?: string | null;  // Optional description of the project, can be null
    startDate?: Date | null;      // Project start date, can be null
    endDate?: Date | null;        // Optional end date for the project, can be null
    status?: ProjectStatus | null; // Project status, can be null
}