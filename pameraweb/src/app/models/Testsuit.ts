import { Testcase } from "./Testcase";
import { Testplan } from "./Testplan";

export interface Testsuit{
    id?: number|null;
    name: string; // Marked as required (equivalent to @NotNull in Java)
    description?: string|null;
    startDate?: Date|null;
    finishDate?: Date|null;
    testplanid:number|null
    testcases:Testcase[]|null;
  }