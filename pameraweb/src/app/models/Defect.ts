export interface Defect {
    id?: number | null;
    name?: string | null;
    description?: string | null;
    memo?: string | null;
    detectedBy?: string | null;
    assignTo?: string | null;
    priority?: string | null;
    severity?: string | null;
    status?: string | null;
    type?: string | null;
    category?: string | null;
    detectedAt?: Date | null;
    closedAt?: Date | null;
  }