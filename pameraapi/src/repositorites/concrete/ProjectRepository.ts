import { injectable, inject } from 'inversify';
import { Model } from 'mongoose';
import {BaseRepository} from "./common/BaseRepository";
import {IProject} from "../../models/Project";
import {IProjectRepository} from "../abstract/IProjectRepository";


@injectable()
export class ProjectRepository extends BaseRepository<IProject> implements IProjectRepository{
    constructor(
        @inject('ProjectModel') projectModel: Model<IProject>
    ) {
        super(projectModel);
    }
    // You can add specific methods related to NoteEntity here if needed
}
