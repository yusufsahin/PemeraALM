export enum ProjectStatus {
  Initiation = 'Initiation',
  Planning = 'Planning',
  Execution = 'Execution',
  Monitor = 'Monitor',
  Closed = 'Closed'
}

export interface Project {
  _id: string;
  id: string;
  name: string;
  description?: string | null;
  memo?: string | null;
  scope?: string | null;
  projectManager?: string | null;
  projectAssistant?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  status?: ProjectStatus | null;
}


export interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}
