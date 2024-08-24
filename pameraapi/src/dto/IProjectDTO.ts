export interface IProjectDTO {
    id?: string; // Optional, only required when retrieving or updating a project
    _id?: string; // Optional, only required when retrieving or updating a project
    name: string;
    description?: string;
    memo?: string;
    scope?: string;
    projectManagerId?: string | null; // Nullable field for project manager
    projectAssistantId?: string | null; // Nullable field for project assistant
    startDate?: Date;
    finishDate?: Date;
    status?: string; // Could be an enum like ProjectStatus
}
