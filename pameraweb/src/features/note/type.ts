import { Note } from '../../app/models/Note';

export interface NoteState {
  notes: Note[];
  note: Note;
  currentNote: Note;
  loading: boolean;
  err: Record<string, any>;
}