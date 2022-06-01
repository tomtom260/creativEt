import { configureStore } from "@reduxjs/toolkit"
import modalSlice from "./modalSlice"
import toastSlice from "./toastSlice"

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    toast: toastSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
