export interface ITaskDTO {
    _id?: string;   // Optional for creating a new task, required for updates
    id?: string;    // Virtual field that maps to _id for client use
    name: string; // Required
    description?: string; // Optional
    dueDate?: Date; // Optional
    expectedDate?: Date; // Optional
    actualDate?: Date; // Optional
    hoursExpected?: number; // Optional
    hoursActual?: number; // Optional
    assignTo?: string; // Optional
    type?: string;// Optional
    category?: string; // Optional
    status?: string; // Optional
    workitemId?: string | null; // Required, the ID of the associated Workitem
}
