import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "../../app/api/pameraapi"

import { AxiosError } from "axios";
import { Workitem } from "../../app/models/Workitem";
import { WorkitemState } from "./type";

const initialState: WorkitemState = {
  workitems: [],
  workitem: {} as Workitem,
  currentWorkitem: {} as Workitem,
  loading: true,
  err: {},
};

export const changeWorkitem = createAsyncThunk<
  Workitem,
  Workitem,
  { rejectValue: unknown }
>("/workitems/changeWorkitem", async (data, thunkApi) => {
  try {
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getWorkitemsByProjectId = createAsyncThunk("/workitems/getWorkitems", async (projectId: string | undefined, thunkApi) => {
  console.log(projectId)
  try {
    let url = "/workitems";

    if (projectId !== null) {
      url = `/workitems?projectId=${projectId}`;
    }

    const response = await axios.get<Workitem[]>(url);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError; // Assuming the error is coming from an Axios request.
    return thunkApi.rejectWithValue(axiosError.response?.data);
  }
});

export const getWorkitem = createAsyncThunk<
  Workitem,
  { id: string },
  { rejectValue: unknown }
>("/workitems/getWorkitem", async (data, thunkApi) => {
  try {
    const response = await axios.get<Workitem>("/workitems/" + data.id);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkApi.rejectWithValue(axiosError.response?.data);
  }
});


export const saveWorkitem = createAsyncThunk<Workitem, Workitem, { rejectValue: unknown }>(
  "/workitems/saveWorkitem",
  async (data, thunkApi) => {
    try {
      const response = await axios.post<Workitem>("/workitems", data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkApi.rejectWithValue(axiosError.response?.data);
    }
  }
);

export const updateWorkitem = createAsyncThunk<
  Workitem,
  Workitem,
  { rejectValue: unknown }
>("/workitems/updateWorkitem", async (data, thunkApi) => {
  try {
    console.log(data);
    const response = await axios.put<Workitem>(`/workitems/${data.id}`, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkApi.rejectWithValue(axiosError.response?.data);
  }
});

export const deleteWorkitem = createAsyncThunk<
  Workitem,
  { id: string },
  { rejectValue: unknown }
>("/workitems/deleteWorkitem", async (data, thunkApi) => {
  try {
    // Workitem the `.id` appended to `data` in the axios.delete URL template
    const response = await axios.delete<Workitem>(`/workitems/${data.id}`);
    return { ...data, ...response.data };
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkApi.rejectWithValue(axiosError.response?.data);
  }
});

export const workitemSlice = createSlice({
  name: "workitem",
  initialState,
  reducers: {
    deleteCurrentWorkitem: (state) => {
      state.currentWorkitem ={} as Workitem
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      changeWorkitem.fulfilled,
      (state, action: PayloadAction<Workitem>) => {
        console.log(action.payload);
        state.currentWorkitem = action.payload;
      }
    );

    builder.addCase(getWorkitemsByProjectId.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getWorkitemsByProjectId.fulfilled,
      (state, action: PayloadAction<Workitem[]>) => {
        console.log(action.payload);
        state.workitems = action.payload;
        state.loading = false;
      }
    );

    builder.addCase(
      getWorkitemsByProjectId.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Problem on getting Data." };
      }
    );
    builder.addCase(getWorkitem.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getWorkitem.fulfilled,  (state, action: PayloadAction<Workitem>) =>  {
      state.workitem =action.payload;
      state.loading = false;
    });

    builder.addCase(
      getWorkitem.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Problem on getting Data." };
      }
    );

    builder.addCase(
      saveWorkitem.fulfilled,
      (state, action: PayloadAction<Workitem>) => {
        state.workitems.push(action.payload);
        state.loading = false;
      }
    );

    builder.addCase(saveWorkitem.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      saveWorkitem.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Error on Saving" };
      }
    );

    builder.addCase(
      updateWorkitem.fulfilled,
      (state, action: PayloadAction<Workitem>) => {
        const index = state.workitems.findIndex((n) => n.id === action.payload.id);
        if (index !== -1) {
          state.workitems[index] = action.payload;
        }
        state.loading = false;

      }
    );

    builder.addCase(updateWorkitem.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateWorkitem.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Error on updating" };
      }
    );

    builder.addCase(
      deleteWorkitem.fulfilled,
      (state, action: PayloadAction<Workitem>) => {
        state.workitems = state.workitems.filter((n) => n.id !== action.payload.id);
        state.loading = false;
      }
    );

    builder.addCase(deleteWorkitem.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteWorkitem.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.err = { message: "Error on deleting" };
      }
    );
  },
});

export default workitemSlice.reducer;
