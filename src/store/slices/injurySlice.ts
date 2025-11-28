import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InjuryFormState = {
  type: string;
  isEditMode: boolean;
  typeOfLoss: string;
  classification: string;
  classifyIllness: string;
  daysAwayFromWork?: string;
  jobRestrictionDays?: string;
  dateOfDeath?: string;
  affectedBodyParts: string[];
  uploadedFiles?: any[];
  treatmentFacilityType?: 'Yes' | 'No';
  whyIncidentHappened: string;
  whyHazardNotIdentified: string;
  narObjectSubstance: string;
  narBeforeIncident: string;
  whyEmployeeInSituation: string;
  whyProcedureNotFollowed: string;
  whyControlsFailed: string;
  narWhatHappened: string;
  rootCauseAnalysis: string;
  otherContext?: string;
  investigationId: string | undefined;
  customQuestions: Array<{
    questionId: string;
    question: string;
    answer: string;
  }>;
  otherQuestions?: Array<{
    question: string;
    answer: string;
    questionType: 'Short Answer Text' | 'Long Answer Text' | 'Yes/No';
  }>;

  errors: {
    type?: string;
    typeOfLoss?: string;
    narBeforeIncident?: string;
    treatmentFacilityType?: 'Yes' | 'No';
    narObjectSubstance?: string;
    classification?: string;
    classifyIllness?: string;
    daysAwayFromWork?: string;
    jobRestrictionDays?: string;
    dateOfDeath?: string;
    affectedBodyParts?: string;
    uploadedFiles?: string;
    whyIncidentHappened?: string;
    whyHazardNotIdentified?: string;
    whyEmployeeInSituation?: string;
    whyProcedureNotFollowed?: string;
    whyControlsFailed?: string;
    investigationId?: string;
    rootCauseAnalysis?: string;
    narWhatHappened?: string;
    otherContext?: string;
    otherQuestions?: { [id: string]: string | undefined };
    customQuestions?: { [index: number]: string };
  };
  initialValues: Partial<InjuryFormState> | null;
  hasFormChanged: boolean;
};

const initialState: InjuryFormState = {
  type: 'Injury',
  typeOfLoss: '',
  classification: '',
  narBeforeIncident: '',
  classifyIllness: '',
  affectedBodyParts: [],
  uploadedFiles: [],
  whyIncidentHappened: '',
  daysAwayFromWork: '',
  jobRestrictionDays: '',
  treatmentFacilityType: 'Yes',
  dateOfDeath: '',
  otherContext: '',
  narWhatHappened: '',
  narObjectSubstance: '',
  whyHazardNotIdentified: '',
  whyEmployeeInSituation: '',
  whyProcedureNotFollowed: '',
  investigationId: '',
  whyControlsFailed: '',
  rootCauseAnalysis: '',
  customQuestions: [],
  otherQuestions: [],
  errors: {},
  isEditMode: false,
  initialValues: null,
  hasFormChanged: false,
};

const injuryFormSlice = createSlice({
  name: 'injuryForm',
  initialState,
  reducers: {
    setField: (
      state,
      action: PayloadAction<{
        field: keyof Omit<InjuryFormState, 'errors'>;
        value: any;
      }>,
    ) => {
      const { field, value } = action.payload;
      (state[field] as (typeof state)[keyof Omit<InjuryFormState, 'errors'>]) =
        value;
      delete state.errors[field as keyof typeof state.errors];
    },
    setEditMode: (
      state,
      action: PayloadAction<{ isEditMode: boolean; investigationId?: string }>,
    ) => {
      state.isEditMode = action.payload.isEditMode;
      state.investigationId = action.payload.investigationId;
    },
    setFields: (
      state,
      action: PayloadAction<Partial<Omit<InjuryFormState, 'errors'>>>,
    ) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        const typedKey = key as keyof Omit<InjuryFormState, 'errors'>;
        (state as any)[typedKey] = value;
        delete state.errors[typedKey as keyof typeof state.errors];
      });
    },
    setErrors: (state, action: PayloadAction<InjuryFormState['errors']>) => {
      state.errors = action.payload;
    },
    setcustomQuestions: (
      state,
      action: PayloadAction<
        Array<{ questionId: string; answer: string; question: string }>
      >,
    ) => {
      state.customQuestions = action.payload;
    },
    setInitialValues: (
      state,
      action: PayloadAction<Partial<InjuryFormState>>,
    ) => {
      state.initialValues = action.payload;
    },
    setFormChanged: (state, action: PayloadAction<boolean>) => {
      state.hasFormChanged = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const {
  setField,
  setFields,
  setErrors,
  setcustomQuestions,
  setInitialValues,
  setFormChanged,
  resetForm,
} = injuryFormSlice.actions;
export default injuryFormSlice.reducer;
