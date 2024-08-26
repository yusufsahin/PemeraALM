import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import securityReducer from "../../features/auth/securitySlice"
import modalReducer from "../../features/modal/modalSlice";
import noteReducer from "../../features/note/noteSlice";
import projectReducer from "../../features/project/projectSlice";
import userReducer from "../../features/user/userSlice";
import workitemReducer from "../../features/workitem/workitemSlice";
import taskReducer from "../../features/task/taskSlice";

// export function configureStore() {
//     return createStore(counterReducer);
// }

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        security: securityReducer,
        note:noteReducer,
        project:projectReducer,
        workitem:workitemReducer,
        task:taskReducer,
        user: userReducer
        
        }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;