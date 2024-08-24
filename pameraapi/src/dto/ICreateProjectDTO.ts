export interface ICreateProjectDTO {
    name: string;
    description?: string;
    memo?: string;
    scope?: string;
    projectManagerId?: string | null; // Optional, can be null if no project manager is assigned
    projectAssistantId?: string | null; // Optional, can be null if no project assistant is assigned
    startDate?: Date;
    finishDate?: Date;
    status?: string; // Use a string here, or the specific enum type if you have one defined
}
