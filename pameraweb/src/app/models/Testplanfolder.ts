export interface Testplanfolder{
    id?: number|null;
    parentId?: number|null;
    name: string; // Marked as required (equivalent to @NotNull in Java)
    description?: string|null;
    startDate?: Date|null;
    finishDate?: Date|null;
    children?: Testplanfolder[];
  }