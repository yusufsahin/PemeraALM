import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "../../app/api/pameraapi"

import { AxiosError } from "axios";
import { Project } from "../../app/models/Project";
import { ProjectState } from "./type";

const initialState: ProjectState = {
  projects: [],
  project: {} as Project,
  currentProject: {} as Project,
  loading: true,
  err: {},
};

export const changeProject = createAsyncThunk<
  Project,
  Project,
  { rejectValue: unknown }
>("/projects/changeProject", async (data, thunkApi) => {
  try {
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getProjects = createAsyncThunk<
  Project[],
  void,
  { rejectValue: unknown }
>("/projects/getProjects", async (_, thunkApi) => {
  try {
    const response = await axios.get<Project[]>("/projects");
    console.log(response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(error);
    console.log(axiosError);
    return thunkApi.rejectWithValue(axiosError.response?.data);
  }
});
export const getProject = createAsyncThunk<
  Project,
  { id: string },
  { rejectValue: unknown }
>("/projects/getProject", async (data, thunkApi) => {
  try {
    const response = await axios.get<Project>("/projects/" + data.id);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkApi.rejectWithValue(axiosError.response?.data);
  }
});


export const saveProject = createAsyncThunk<Project, Project, { rejectValue: unknown }>(
  "/projects/saveProject",
  async (data, thunkApi) => {
    try {
      const response = await axios.post<Project>("/projects", data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkApi.rejectWithValue(axiosError.response?.data);
    }
  }
);

export const updateProject = createAsyncThunk<
  Project,
  Project,
  { rejectValue: unknown }
>("/projects/updateProject", async (data, thunkApi) => {
  try {
    console.log(data);
    const response = await axios.put<Project>(`/projects/${data.id}`, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkApi.rejectWithValue(axiosError.response?.data);
  }
});

export const deleteProject = createAsyncThunk<
  Project,
  { id: string },
  { rejectValue: unknown }
>("/projects/deleteProject", async (data, thunkApi) => {
  try {
    // Project the `.id` appended to `data` in the axios.delete URL template
    const response = await axios.delete<Project>(`/projects/${data.id}`);
    return { ...data, ...response.data };
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkApi.rejectWithValue(axiosError.response?.data);
  }
});

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    deleteCurrentProject: (state) => {
      state.currentProject ={} as Project
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      changeProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        console.log(action.payload);
        state.currentProject = action.payload;
      }
    );

    builder.addCase(getProjects.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getProjects.fulfilled,
      (state, action: PayloadAction<Project[]>) => {
        console.log(action.payload);
        state.projects = action.payload;
        state.loading = false;
      }
    );

    builder.addCase(
      getProjects.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Problem on getting Data." };
      }
    );
    builder.addCase(getProject.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getProject.fulfilled,  (state, action: PayloadAction<Project>) =>  {
      state.project =action.payload;
      state.loading = false;
    });

    builder.addCase(
      getProject.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Problem on getting Data." };
      }
    );

    builder.addCase(
      saveProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        state.projects.push(action.payload);
        state.loading = false;
      }
    );

    builder.addCase(saveProject.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      saveProject.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Error on Saving" };
      }
    );

    builder.addCase(
      updateProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        const index = state.projects.findIndex((n) => n.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        state.loading = false;

      }
    );

    builder.addCase(updateProject.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateProject.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Error on updating" };
      }
    );

    builder.addCase(
      deleteProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        state.projects = state.projects.filter((n) => n.id !== action.payload.id);
        state.loading = false;
      }
    );

    builder.addCase(deleteProject.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteProject.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Error on deleting" };
      }
    );
  },
});

export default projectSlice.reducer;
