import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../app/api/pameraapi';
import { UserState, User } from './type';

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

// API Base URL
const API_URL = '/users';

// Thunks for CRUD operations
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get<User[]>(API_URL);
    return response.data;
});

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id: string) => {
    const response = await axios.get<User>(`${API_URL}/${id}`);
    return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async (user: Omit<User, 'id'>) => {
    const response = await axios.post<User>(API_URL, user);
    return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (user: User) => {
    const response = await axios.put<User>(`${API_URL}/${user.id}`, user);
    return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            })

            // Fetch a user by ID
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                const index = state.users.findIndex(u => u.id === action.payload.id);
                if (index >= 0) {
                    state.users[index] = action.payload;
                } else {
                    state.users.push(action.payload);
                }
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch the user';
            })

            // Create a new user
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create the user';
            })

            // Update a user
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                const index = state.users.findIndex(u => u.id === action.payload.id);
                if (index >= 0) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update the user';
            })

            // Delete a user
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.users = state.users.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete the user';
            });
    },
});

export const { resetError } = userSlice.actions;
export default userSlice.reducer;
