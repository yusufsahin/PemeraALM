import { Container } from 'inversify';
import { Model } from 'mongoose';
import { INote, Note } from '../models/Note';
import { IUser, User } from '../models/User';
import { INoteService } from '../services/abstract/INoteService';
import { NoteService } from '../services/concrete/NoteService';
import { INoteRepository } from '../repositorites/abstract/INoteRepository';
import { NoteRepository } from '../repositorites/concrete/NoteRepository';
import { NoteController } from '../controllers/NoteController';
import { IUserRepository } from '../repositorites/abstract/IUserRepository';
import { UserRepository } from '../repositorites/concrete/UserRepository';
import { IAuthService } from '../services/abstract/IAuthService';
import { AuthService } from '../services/concrete/AuthService';
import { AuthController } from '../controllers/AuthController';
import { IRole, Role } from '../models/Role';
import { IRoleRepository } from '../repositorites/abstract/IRoleRepository';
import { RoleRepository } from '../repositorites/concrete/RoleRepository';
import { IRoleService } from '../services/abstract/IRoleService';
import { RoleService } from '../services/concrete/RoleService';
import { RoleController } from '../controllers/RoleController';
import { IPrivilege, Privilege } from '../models/Privilege';
import { IPrivilegeRepository } from '../repositorites/abstract/IPrivilegeRepository';
import { PrivilegeRepository } from '../repositorites/concrete/PrivilegeRepository';
import {ModelDefaultSeeder} from "../seeder/ModelDefaultSeeder";
import {IProject, Project} from "../models/Project";
import {IProjectRepository} from "../repositorites/abstract/IProjectRepository";
import {ProjectRepository} from "../repositorites/concrete/ProjectRepository";
import {IProjectService} from "../services/abstract/IProjectService";
import {ProjectService} from "../services/concrete/ProjectService";
import {ProjectController} from "../controllers/ProjectController";
import {IWorkitem, Workitem} from "../models/Workitem";
import {ITask, Task} from "../models/Task";
import {IWorkitemRepository} from "../repositorites/abstract/IWorkitemRepository";
import {WorkitemRepository} from "../repositorites/concrete/WorkitemRepository";
import {ITaskRepository} from "../repositorites/abstract/ITaskRepository";
import {TaskRepository} from "../repositorites/concrete/TaskRepository";
import {IWorkitemService} from "../services/abstract/IWorkitemService";
import {WorkitemService} from "../services/concrete/WorkitemService";
import {ITaskService} from "../services/abstract/ITaskService";
import {TaskService} from "../services/concrete/TaskService";
import {WorkitemController} from "../controllers/WorkitemController";
import {TaskController} from "../controllers/TaskController";
import {IUserService} from "../services/abstract/IUserService";
import {UserService} from "../services/concrete/UserService";
import {UserController} from "../controllers/UserController";



// Create a new Inversify container
const container = new Container();

// Bind Note model
container.bind<Model<INote>>('NoteModel').toConstantValue(Note);

// Bind User model
container.bind<Model<IUser>>('UserModel').toConstantValue(User);

// Bind Role model
container.bind<Model<IRole>>('RoleModel').toConstantValue(Role);
container.bind<Model<IPrivilege>>('PrivilegeModel').toConstantValue(Privilege);

container.bind<Model<IProject>>('ProjectModel').toConstantValue(Project);
container.bind<Model<IWorkitem>>('WorkitemModel').toConstantValue(Workitem);
container.bind<Model<ITask>>('TaskModel').toConstantValue(Task);


// Bind NoteService to INoteService interface
container.bind<INoteService>('INoteService').to(NoteService);
container.bind<IProjectService>('IProjectService').to(ProjectService);

container.bind<IWorkitemService>('IWorkitemService').to(WorkitemService);
container.bind<ITaskService>('ITaskService').to(TaskService);
// Bind NoteRepository to INoteRepository interface
container.bind<INoteRepository>('INoteRepository').to(NoteRepository);

container.bind<IProjectRepository>('IProjectRepository').to(ProjectRepository);
container.bind<ITaskRepository>('ITaskRepository').to(TaskRepository);
// Bind UserRepository to IUserRepository interface
container.bind<IUserRepository>('IUserRepository').to(UserRepository);
container.bind<IUserService>('IUserService').to(UserService);
// Bind RoleRepository to IRoleRepository interface
container.bind<IRoleRepository>('IRoleRepository').to(RoleRepository);
container.bind<IWorkitemRepository>('IWorkitemRepository').to(WorkitemRepository);
// Bind AuthService to IAuthService interface
container.bind<IAuthService>('IAuthService').to(AuthService);

// Bind RoleService to IRoleService interface
container.bind<IRoleService>('IRoleService').to(RoleService);

// Bind PrivilegeRepository to IPrivilegeRepository interface
container.bind<IPrivilegeRepository>('IPrivilegeRepository').to(PrivilegeRepository);

// Bind Controllers
container.bind(NoteController).toSelf();
container.bind(AuthController).toSelf();
container.bind(RoleController).toSelf();
container.bind(ProjectController).toSelf();
container.bind(WorkitemController).toSelf();
container.bind(TaskController).toSelf();
container.bind(ModelDefaultSeeder).toSelf();
container.bind(UserController).toSelf();
export { container };

