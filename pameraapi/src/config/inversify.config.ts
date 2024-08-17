import { Container } from 'inversify';
import { NoteService } from '../services/concrete/NoteService';
import {NoteRepository} from "../repositorites/concrete/NoteRepository";
import {Model} from "mongoose";
import {INote, Note} from "../models/Note";


const container = new Container();

// Bind services
container.bind<Model<INote>>(Note).toConstantValue(Note);

// Bind services
container.bind<NoteService>(NoteService).toSelf();

// Bind repositories
container.bind<NoteRepository>(NoteRepository).toSelf();

export { container };
