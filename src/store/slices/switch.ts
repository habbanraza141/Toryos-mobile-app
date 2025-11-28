import {createSlice} from '@reduxjs/toolkit';

export const SWITCH_SLICE_INITIAL_STATE = {
  active: false,
};

const switchSlice = createSlice({
  name: 'sidebar-toggle',
  initialState: SWITCH_SLICE_INITIAL_STATE,
  reducers: {
    toggleSwitch: state => {
      state.active = !state.active;
    },
  },
});

export const toggleSwitch = switchSlice.actions.toggleSwitch;
export default switchSlice.reducer;
