import { Notification } from "@prisma/client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type ToastSlice = {
  toasts: Notification[]
}

const initialState: ToastSlice = {
  toasts: [],
}

export const toastSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<Notification>) {
      state.toasts.push(action.payload)
    },
  },
})
export const { addToast } = toastSlice.actions

export default toastSlice.reducer
