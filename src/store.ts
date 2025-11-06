// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
// import your slices here later, e.g. import user from "./features/userSlice"

export const store = configureStore({
  reducer: {
    // user,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
