import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "../../app/api/pameraapi"

import { AxiosError } from "axios";
import { Note } from "../../app/models/Note";
import { NoteState } from "./type";

const initialState: NoteState = {
  notes: [],
  note: {} as Note,
  currentNote: {} as Note,
  loading: true,
  err: {},
};

export const changeNote = createAsyncThunk<
  Note,
  Note,
  { rejectValue: unknown }
>("/notes/changeNote", async (data, thunkApi) => {
  try {
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getNotes = createAsyncThunk<
  Note[],
  void,
  { rejectValue: unknown }
>("/notes/getNotes", async (_, thunkApi) => {
  try {
    const response = await axios.get<Note[]>("/notes");
    console.log(response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(error);
    console.log(axiosError);
    return thunkApi.rejectWithValue(axiosError.response?.data);
  }
});
export const getNote = createAsyncThunk<
  Note,
  { id: string },
  { rejectValue: unknown }
>("/notes/getNote", async (data, thunkApi) => {
  try {
    const response = await axios.get<Note>("/notes/" + data.id);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkApi.rejectWithValue(axiosError.response?.data);
  }
});


export const saveNote = createAsyncThunk<Note, Note, { rejectValue: unknown }>(
  "/notes/saveNote",
  async (data, thunkApi) => {
    try {
      const response = await axios.post<Note>("/notes", data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkApi.rejectWithValue(axiosError.response?.data);
    }
  }
);

export const updateNote = createAsyncThunk<
  Note,
  Note,
  { rejectValue: unknown }
>("/notes/updateNote", async (data, thunkApi) => {
  try {
    console.log(data);
    const response = await axios.put<Note>(`/notes/${data.id}`, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkApi.rejectWithValue(axiosError.response?.data);
  }
});

export const deleteNote = createAsyncThunk<
  Note,
  { id: string },
  { rejectValue: unknown }
>("/notes/deleteNote", async (data, thunkApi) => {
  try {
    // Note the `.id` appended to `data` in the axios.delete URL template
    const response = await axios.delete<Note>(`/notes/${data.id}`);
    return { ...data, ...response.data };
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkApi.rejectWithValue(axiosError.response?.data);
  }
});

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    deleteCurrentNote: (state) => {
      state.currentNote ={} as Note
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      changeNote.fulfilled,
      (state, action: PayloadAction<Note>) => {
        console.log(action.payload);
        state.currentNote = action.payload;
      }
    );

    builder.addCase(getNotes.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getNotes.fulfilled,
      (state, action: PayloadAction<Note[]>) => {
        console.log(action.payload);
        state.notes = action.payload;
        state.loading = false;
      }
    );

    builder.addCase(
      getNotes.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Problem on getting Data." };
      }
    );
    builder.addCase(getNote.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getNote.fulfilled,  (state, action: PayloadAction<Note>) =>  {
      state.note =action.payload;
      state.loading = false;
    });

    builder.addCase(
      getNote.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Problem on getting Data." };
      }
    );

    builder.addCase(
      saveNote.fulfilled,
      (state, action: PayloadAction<Note>) => {
        state.notes.push(action.payload);
        state.loading = false;
      }
    );

    builder.addCase(saveNote.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      saveNote.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Error on Saving" };
      }
    );

    builder.addCase(
      updateNote.fulfilled,
      (state, action: PayloadAction<Note>) => {
        const index = state.notes.findIndex((n) => n.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
        state.loading = false;

      }
    );

    builder.addCase(updateNote.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateNote.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Error on updating" };
      }
    );

    builder.addCase(
      deleteNote.fulfilled,
      (state, action: PayloadAction<Note>) => {
        state.notes = state.notes.filter((n) => n.id !== action.payload.id);
        state.loading = false;
      }
    );

    builder.addCase(deleteNote.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteNote.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Error on deleting" };
      }
    );
  },
});

export default noteSlice.reducer;
