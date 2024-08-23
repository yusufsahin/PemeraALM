import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  // Add your reducers here
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
