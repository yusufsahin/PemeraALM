import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalState } from './type';



const initialState: ModalState = {
  modalType: '',
  modalProps: null, // You should replace 'any' with the appropriate type
  isOpened: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ modalType: string; modalProps: any }> // Replace 'any' with the appropriate type
    ) => {
      const { modalType, modalProps } = action.payload;
      state.modalType = modalType;
      state.modalProps = modalProps;
      state.isOpened = true;
    },
    closeModal: (state) => {
      state.isOpened = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

