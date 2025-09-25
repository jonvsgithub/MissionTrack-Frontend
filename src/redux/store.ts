import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./companySlice";

export const store = configureStore({
  reducer: {
    company: companyReducer,
  },
});

// ✅ Types for usage with useSelector & useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
