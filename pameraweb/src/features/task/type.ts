import { Task } from "../../app/models/Task";

export interface TaskState {
  tasks: Task[],
  task:Task,
  currentTask: Task,
  loading: boolean,
  err: Record<string, any>;
}