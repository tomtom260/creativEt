import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type ModalSlice = {
  isModalVisible: boolean
  modalPayload: null | {}
}

const initialState: ModalSlice = {
  isModalVisible: false,
  modalPayload: null,
}

export const modalSlice = createSlice({
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
export const { showModal, hideModal } = modalSlice.actions

export default modalSlice.reducer
