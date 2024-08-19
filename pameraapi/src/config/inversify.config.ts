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
import {IRole, Role} from "../models/Role";
import {IRoleRepository} from "../repositorites/abstract/IRoleRepository";
import {RoleRepository} from "../repositorites/concrete/RoleRepository";
import {IRoleService} from "../services/abstract/IRoleService";
import {RoleService} from "../services/concrete/RoleService";
import {RoleController} from "../controllers/RoleController";
import {RoleSeeder} from "../seeder/roleSeeder";

// Create a new Inversify container
const container = new Container();
// Bind Note model
container.bind<Model<INote>>('NoteModel').toConstantValue(Note);

// Bind User model
container.bind<Model<IUser>>('UserModel').toConstantValue(User);

// Bind Role model
container.bind<Model<IRole>>('RoleModel').toConstantValue(Role);

// Bind NoteService to INoteService interface
container.bind<INoteService>('INoteService').to(NoteService);

// Bind NoteRepository to INoteRepository interface
container.bind<INoteRepository>('INoteRepository').to(NoteRepository);

// Bind UserRepository to IUserRepository interface
container.bind<IUserRepository>('IUserRepository').to(UserRepository);

// Bind RoleRepository to IRoleRepository interface
container.bind<IRoleRepository>('IRoleRepository').to(RoleRepository);

// Bind AuthService to IAuthService interface
container.bind<IAuthService>('IAuthService').to(AuthService);

// Bind RoleService to IRoleService interface
container.bind<IRoleService>('IRoleService').to(RoleService);

// Bind Controllers
container.bind(NoteController).toSelf();
container.bind(AuthController).toSelf();
container.bind(RoleController).toSelf();

// Bind RoleSeeder for role seeding
container.bind<RoleSeeder>(RoleSeeder).toSelf();


export { container };
