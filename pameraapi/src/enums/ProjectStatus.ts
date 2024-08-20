// src/enums/ProjectStatus.ts

export enum ProjectStatus {
    Initiation = 1,
    Planning=2,
    Execution=3,
    Monitor=4,
    Closed=5
}

// Utility function to get ProjectStatus by ID
export function getProjectStatusById(id: number): ProjectStatus | null {
    if (Object.values(ProjectStatus).includes(id)) {
        return id as ProjectStatus;
    }
    return null;
}
