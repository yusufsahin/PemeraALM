import { Testsuit } from "./Testsuit";

export interface Testplan{
    id?: number|null;
    testplanfolderid?: number|null;
    name: string; // Marked as required (equivalent to @NotNull in Java)
    description?: string|null;
    startDate?: Date|null;
    finishDate?: Date|null;
    testsuits:Testsuit[]
  }