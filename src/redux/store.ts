import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./companySlice";
import actionReducer from "./actionSlice";
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    company: companyReducer,
    adminAction: actionReducer,
    profile: profileReducer,
  },
});

// ✅ Types for usage with useSelector & useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
