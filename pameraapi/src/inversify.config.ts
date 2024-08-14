import { Container } from 'inversify';
import { NoteService } from './services/NoteService';
import {NoteRepository} from "./repositorites/NoteRepository";



const container = new Container();

// Bind services
container.bind<NoteService>(NoteService).toSelf();

// Bind repositories
container.bind<NoteRepository>(NoteRepository).toSelf();



export { container };