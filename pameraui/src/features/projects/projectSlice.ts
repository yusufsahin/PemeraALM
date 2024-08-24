import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from "../../app/api/pameraapi";
import { Project, ProjectState } from './type';



const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

// API Base URL
const API_URL = '/projects';

// Thunks for CRUD operations
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await axios.get<Project[]>(API_URL);
  return response.data;
});

export const fetchProjectById = createAsyncThunk('projects/fetchProjectById', async (id: string) => {
  const response = await axios.get<Project>(`${API_URL}/${id}`);
  return response.data;
});

export const createProject = createAsyncThunk('projects/createProject', async (project: Omit<Project, 'id'>) => {
  const response = await axios.post<Project>(API_URL, project);
  return response.data;
});

export const updateProject = createAsyncThunk('projects/updateProject', async (project: Project) => {
  const response = await axios.put<Project>(`${API_URL}/${project.id}`, project);
  return response.data;
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch projects';
      })

      // Fetch a project by ID
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action: PayloadAction<Project>) => {
        state.loading = false;
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index >= 0) {
          state.projects[index] = action.payload;
        } else {
          state.projects.push(action.payload);
        }
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch the project';
      })

      // Create a new project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create the project';
      })

      // Update a project
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.loading = false;
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index >= 0) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update the project';
      })

      // Delete a project
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.projects = state.projects.filter(project => project.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete the project';
      });
  },
});

export const { resetError } = projectSlice.actions;

export default projectSlice.reducer;
