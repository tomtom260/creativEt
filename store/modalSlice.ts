import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type CounterState = {
  isModalVisible: boolean
  modalPayload: null | {}
}

const initialState: CounterState = {
  isModalVisible: false,
  modalPayload: null,
}

export const counterSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action) {
      state.isModalVisible = true
      state.modalPayload = action.payload
    },
    hideModal(state) {
      state.isModalVisible = false
      state.modalPayload = null
    },
  },
})
export const { showModal, hideModal } = counterSlice.actions

export default counterSlice.reducer
