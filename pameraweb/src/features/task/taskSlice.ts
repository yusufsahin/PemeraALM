import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "../../app/api/pameraapi"

import { AxiosError } from "axios";
import { Task } from "../../app/models/Task";
import { TaskState } from "./type";

const initialState: TaskState = {
  tasks: [],
  task: {} as Task,
  currentTask: {} as Task,
  loading: true,
  err: {},
};

export const changeTask = createAsyncThunk<
  Task,
  Task,
  { rejectValue: unknown }
>("/tasks/changeTask", async (data, thunkApi) => {
  try {
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getTasks = createAsyncThunk("/tasks/getTasks", async (workitem: string | undefined, thunkApi) => {
  console.log(workitem)
  try {
    let url = "/tasks";

    if (workitem !== null) {
      url = `/tasks?workitemId=${workitem}`;
    }

    const response = await axios.get<Task[]>(url);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError; // Assuming the error is coming from an Axios request.
    return thunkApi.rejectWithValue(axiosError.response?.data);
  }
});

export const getTask = createAsyncThunk<
  Task,
  { id: string },
  { rejectValue: unknown }
>("/tasks/getTask", async (data, thunkApi) => {
  try {
    const response = await axios.get<Task>("/tasks/" + data.id);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkApi.rejectWithValue(axiosError.response?.data);
  }
});


export const saveTask = createAsyncThunk<Task, Task, { rejectValue: unknown }>(
  "/tasks/saveTask",
  async (data, thunkApi) => {
    try {
      const response = await axios.post<Task>("/tasks", data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkApi.rejectWithValue(axiosError.response?.data);
    }
  }
);

export const updateTask = createAsyncThunk<
  Task,
  Task,
  { rejectValue: unknown }
>("/tasks/updateTask", async (data, thunkApi) => {
  try {
    console.log(data);
    const response = await axios.put<Task>(`/tasks/${data.id}`, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkApi.rejectWithValue(axiosError.response?.data);
  }
});

export const deleteTask = createAsyncThunk<
  Task,
  { id:string },
  { rejectValue: unknown }
>("/tasks/deleteTask", async (data, thunkApi) => {
  try {
    // Task the `.id` appended to `data` in the axios.delete URL template
    const response = await axios.delete<Task>(`/tasks/${data.id}`);
    return { ...data, ...response.data };
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkApi.rejectWithValue(axiosError.response?.data);
  }
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    deleteCurrentTask: (state) => {
      state.currentTask ={} as Task
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      changeTask.fulfilled,
      (state, action: PayloadAction<Task>) => {
        console.log(action.payload);
        state.currentTask = action.payload;
      }
    );

    builder.addCase(getTasks.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getTasks.fulfilled,
      (state, action: PayloadAction<Task[]>) => {
        console.log(action.payload);
        state.tasks = action.payload;
        state.loading = false;
      }
    );

    builder.addCase(
      getTasks.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Problem on getting Data." };
      }
    );
    builder.addCase(getTask.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTask.fulfilled,  (state, action: PayloadAction<Task>) =>  {
      state.task =action.payload;
      state.loading = false;
    });

    builder.addCase(
      getTask.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Problem on getting Data." };
      }
    );

    builder.addCase(
      saveTask.fulfilled,
      (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
        state.loading = false;
      }
    );

    builder.addCase(saveTask.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      saveTask.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Error on Saving" };
      }
    );

    builder.addCase(
      updateTask.fulfilled,
      (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((n) => n.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.loading = false;

      }
    );

    builder.addCase(updateTask.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateTask.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Error on updating" };
      }
    );

    builder.addCase(
      deleteTask.fulfilled,
      (state, action: PayloadAction<Task>) => {
        state.tasks = state.tasks.filter((n) => n.id !== action.payload.id);
        state.loading = false;
      }
    );

    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteTask.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Error on deleting" };
      }
    );
  },
});

export default taskSlice.reducer;
