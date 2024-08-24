export interface Task {
    id?: number;
    name?: string;
    description?: string|null;
    dueDate?: Date;
    expectedDate?: Date;
    actualDate?: Date;
    hoursExpected?: number;
    hoursActual?: number;
    assignTo?: string|null;
    type?: string|null; // Use lowercase 'number' here
    category?: string|null; // Use lowercase 'number' here
    status?: string|null;
    workitemId?: number; // Use lowercase 'number' here
  }
  