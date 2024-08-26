export interface Task {
  _id?: string;
  id?: string;
  name?: string;
  description?: string | null;
  dueDate?: Date;
  expectedDate?: Date;
  actualDate?: Date;
  hoursExpected?: number;
  hoursActual?: number;
  assignTo?: string | null;
  type?: string | null; // Use lowercase 'number' here
  category?: string | null; // Use lowercase 'number' here
  status?: string | null;
  workitemId?: string | null; // Use lowercase 'number' here
}
