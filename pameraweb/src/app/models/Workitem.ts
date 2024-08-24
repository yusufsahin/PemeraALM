import { Task } from "./Task";

export interface Workitem {
    id?: number;
    name?: string;
    description?: string|null;
    point?: number|null;
    dueDate?: Date|null;
    expectedDate?: Date|null;
    actualDate?: Date|null;
    responsibleUser?: string|null;
    type?: string|null;
    category?: string|null;
    state?: string|null;
    projectId?: number;
    tasks?:Task[]
  }

  