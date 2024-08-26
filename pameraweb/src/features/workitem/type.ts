import { Workitem } from "../../app/models/Workitem";

export interface WorkitemState {
  workitems: Workitem[],
  workitem:Workitem,
  currentWorkitem: Workitem,
  loading: boolean,
  err: Record<string, any>;
}