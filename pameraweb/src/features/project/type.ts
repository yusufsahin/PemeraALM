import { Project } from "../../app/models/Project";

export interface ProjectState {
  projects: Project[],
  project:Project,
  currentProject: Project,
  loading: boolean,
  err: Record<string, any>;
}

export interface ProjectMenuProps {
  projects: Project[];
}