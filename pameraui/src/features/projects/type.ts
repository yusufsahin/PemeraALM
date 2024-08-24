export enum ProjectStatus {
    Initiation = 1,
    Planning = 2,
    Execution = 3,
    Monitor = 4,
    Closed = 5
}
export interface Project {
    _id: string;
    id: string;
    name: string;
    description?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    status?: number | null;
  }
  
  export interface ProjectState {
    projects: Project[];
    loading: boolean;
    error: string | null;
}