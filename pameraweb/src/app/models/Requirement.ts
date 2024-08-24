export interface Requirement {
    id?: number|null;
    parentId?: number|null;
    name: string; // Marked as required (equivalent to @NotNull in Java)
    description?: string|null;
    reqCode?: string|null;
    memo?: string|null;
    note?: string|null;
    author?: string|null;
    isReviewed?: boolean;
    requirementType?: string|null;
    requirementCategory?: string|null;
    requirementStatus?: string|null;
    requirementPriority?: string|null;
    children?: Requirement[];
  }