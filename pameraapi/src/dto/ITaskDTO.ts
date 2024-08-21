export interface ITaskDTO {
    _id?: string;   // Optional for creating a new task, required for updates
    id?: string;    // Virtual field that maps to _id for client use
    title: string;  // Task title
    description?: string;  // Optional description of the task
    status?: string;  // Task status
    assignee?: string; // Could be a user ID or similar reference
    dueDate?: Date;  // Task due date
    workitem?: string; // Workitem ID to which the task belongs
}
