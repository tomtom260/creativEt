import { configureStore } from "@reduxjs/toolkit"
import modalSlice from "./modalSlice"

export const store = configureStore({
  reducer: {
    modal: modalSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
