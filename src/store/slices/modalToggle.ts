import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ModalState {
  modalName: string;
}

export const MODAL_TOGGLE_INITIAL_STATE: ModalState = {
  modalName: '',
};

const modalToggle = createSlice({
  name: 'modal-toggle',
  initialState: MODAL_TOGGLE_INITIAL_STATE,
  reducers: {
    toggleModal: (state, action: PayloadAction<string>) => {
      state.modalName = action.payload;
    },
  },
});

export const {toggleModal} = modalToggle.actions;
export default modalToggle.reducer;
