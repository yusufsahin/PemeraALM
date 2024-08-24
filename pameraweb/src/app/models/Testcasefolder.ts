export interface Testcasefolder{
    id?: number|null;
    parentId?: number|null;
    name: string; // Marked as required (equivalent to @NotNull in Java)
    description?: string|null;
    children?: Testcasefolder[];
  }