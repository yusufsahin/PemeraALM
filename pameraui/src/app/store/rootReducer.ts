import { combineReducers } from '@reduxjs/toolkit';
import { securitySlice } from '../../features/auth/securitySlice';

const rootReducer = combineReducers({
    security: securitySlice.reducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
