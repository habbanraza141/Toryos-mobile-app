import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type InvestigationReportState = {
  data: any | null;
  loading: boolean;
  error: string | null;
};

const initialState: InvestigationReportState = {
  data: null,
  loading: false,
  error: null,
};

const investigationReportSlice = createSlice({
  name: 'investigationReport',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setReport(state, action: PayloadAction<any | null>) {
      state.data = action.payload;
    },
    clearReport(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {setLoading, setError, setReport, clearReport} =
  investigationReportSlice.actions;
export default investigationReportSlice.reducer;
