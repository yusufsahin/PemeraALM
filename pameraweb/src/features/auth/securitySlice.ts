import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../app/api/pameraapi";
import { AxiosError } from 'axios';
import { AuthState } from "./type";

interface LoginPayload {
  user: any; // Replace with your specific User type
  token: string;

}

const initialState: AuthState = {
  isAuthenticated: false,
  isRegistered: false,
  token: "",
  user: {},
  err: "",
  loading: false
};

export const login = createAsyncThunk(
  "auth/login",
  async (loginCred: { identifier: string; password: string }, thunkApi) => {
    try {
      const response = await axios.post<LoginPayload>("/auth/login", loginCred);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkApi.rejectWithValue(axiosError.response?.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (registerCred: { firstname :string,lastname:string,username: string; email: string; password: string }, thunkApi) => {
    try {
      const response = await axios.post("/auth/register", registerCred);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkApi.rejectWithValue(axiosError.response?.data);
    }
  }
);

export const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginPayload>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.err = "";
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.isAuthenticated = false;
      state.user = {};
      state.err = action.payload || "Invalid Credentials";
      state.loading = false;
    });
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.isRegistered=true
      state.err = "";
    });
    builder.addCase(register.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.err = action.payload || "Username or Email existed.";
    });
  },
});

export default securitySlice.reducer;
