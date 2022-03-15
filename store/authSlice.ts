import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Status } from "types/status.enum"
import { User } from "types/user"

export type CounterState = {
  user: User | null
  status: Status
}

const initialState: CounterState = {
  user: null,
  status: Status.LOADING,
}

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})
export const {} = counterSlice.actions

export default counterSlice.reducer
