import {inject, injectable} from "inversify";
import {BaseRepository} from "./common/BaseRepository";
import {ITask} from "../../models/Task";
import {ITaskRepository} from "../abstract/ITaskRepository";
import {Model} from "mongoose";

@injectable()
export  class TaskRepository extends BaseRepository<ITask> implements ITaskRepository{
    constructor(
        @inject('TaskModel') taskModel: Model<ITask>
    ) {
        super(taskModel);
    }
    // You can add specific methods related to  here if needed
}