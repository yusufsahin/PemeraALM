import { Container } from 'inversify';
import { NoteService } from '../services/concrete/NoteService';
import {NoteRepository} from "../repositorites/concrete/NoteRepository";
import {Model} from "mongoose";
import {INoteEntity, NoteEntity} from "../models/NoteEntity";


const container = new Container();

// Bind services
container.bind<Model<INoteEntity>>(NoteEntity).toConstantValue(NoteEntity);

// Bind services
container.bind<NoteService>(NoteService).toSelf();

// Bind repositories
container.bind<NoteRepository>(NoteRepository).toSelf();

export { container };
