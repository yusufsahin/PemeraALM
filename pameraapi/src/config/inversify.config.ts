import { Container } from 'inversify';
import { Model } from "mongoose";
import { INote, Note } from "../models/Note";
import { INoteService } from '../services/abstract/INoteService';
import { NoteService } from '../services/concrete/NoteService';
import {INoteRepository} from "../repositorites/abstract/INoteRepository";
import {NoteRepository} from "../repositorites/concrete/NoteRepository";
import {NoteController} from "../controllers/NoteController";


// Create a new Inversify container
const container = new Container();

// Bind the Note model
container.bind<Model<INote>>('NoteModel').toConstantValue(Note);

// Bind the NoteService to its interface
//container.bind<INoteService>(NoteService).toSelf();

// Bind the NoteRepository to its interface
//container.bind<INoteRepository>(NoteRepository).toSelf();
container.bind<INoteService>('INoteService').to(NoteService);
container.bind<INoteRepository>('INoteRepository').to(NoteRepository);
container.bind(NoteController).toSelf();
export { container };
