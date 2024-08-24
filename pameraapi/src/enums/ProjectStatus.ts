// src/enums/ProjectStatus.ts

export enum ProjectStatus {
    Initiation = 'Initiation',
    Planning = 'Planning',
    Execution = 'Execution',
    Monitor = 'Monitor',
    Closed = 'Closed',
}
// Utility function to get ProjectStatus by value
export function getProjectStatusByValue(value: string): ProjectStatus | null {
    if (Object.values(ProjectStatus).includes(value as ProjectStatus)) {
        return value as ProjectStatus;
    }
    return null;
}
