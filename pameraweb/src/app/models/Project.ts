export interface Project {
    _id?: string;
    id?: string;
    name?: string;
    description?: string|null;
    scope?: string|null;
    memo?: string|null;
    projectManager?: string|null;
    projectAssistant?: string|null;
    startDate?: Date|null;
    finishDate?: Date|null;
    status?: string|null;
  }