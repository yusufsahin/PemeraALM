import { Step } from "./Step";
import { Testcasefolder } from "./Testcasefolder";

export interface Testcase {
    id?: number | null;
    name?: string | null;
    description?: string | null;
    memo?: string | null;
    note?: string | null;
    priority?: string | null;
    severity?: string | null;
    status?: string | null;
    type?: string | null;
    category?: string | null;
    state?: string | null;
    steps: Step[]
    testcasefolderid?: number | null;
  }