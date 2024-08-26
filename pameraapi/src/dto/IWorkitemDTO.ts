export interface IWorkitemDTO {
    id?: string; // Optional, only required when retrieving or updating a workitem
    _id?: string; // Optional, only required when retrieving or updating a workitem
    name: string; // Required field
    description?: string; // Optional field
    point?: number; // Optional field
    dueDate?: Date; // Optional field
    expectedDate?: Date; // Optional field
    actualDate?: Date; // Optional field
    responsibleUserId?: string | null; // Nullable field for responsible user
    type?: string; // Optional, could be an enum like WorkitemType
    state?: string; // Optional, could be an enum like WorkitemState
    category?: string; // Optional, could be an enum like WorkitemCategory
    projectId?: string | null;// Optional field for the associated project
    memo?: string; // Optional field
    scope?: string; // Optional field
}

