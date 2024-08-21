import { ITaskDTO } from './ITaskDTO';

export interface IWorkitemDTO {
    _id?: string;   // Optional for creating a new work item, required for updates
    id?: string;    // Virtual field that maps to _id for client use
    title: string;  // Work item title
    description?: string;  // Optional description of the work item
    status?: string;  // Work item status
    project?: string;  // The associated project ID (string to represent ObjectId)
    tasks?: ITaskDTO[];  // List of tasks related to the work item
}
