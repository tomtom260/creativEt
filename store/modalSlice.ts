import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum ModalType {
  BUY_MODAL,
  BOOST_MODAL,
  DELETE_MODAL,
  DEPOSIT_MODAL,
  WITHDRAW_MODAL,
  INSUFFICENT_MODAL,
  HIRE_MODAL,
  FINISH_MODAL,
  PREVIEW_MODAL,
  EDIT_MODAL,
  UPDATE_PROFILE,
  RATING_MODAL,
}

type ModalSlice = {
  modalPayload: null | Record<string, unknown>
  modalType: ModalType | null
}

const initialState: ModalSlice = {
  modalPayload: null,
  modalType: null,
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal<T extends Record<string, unknown>>(
      state: ModalSlice,
      action: PayloadAction<{
        modalType: ModalType
        payload: T
      }>
    ) {
      state.modalType = action.payload.modalType
      state.modalPayload = action.payload.payload
    },
    hideModal(state) {
      state.modalPayload = null
      state.modalType = null
    },
  },
})
export const { showModal, hideModal } = modalSlice.actions

export default modalSlice.reducer
