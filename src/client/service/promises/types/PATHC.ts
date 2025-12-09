export type patchCorrectiveActionUpdateType = {
  correctiveActionId: string;
  incidentId: string;
  payload: any;
};

export type patchPasswordUpdateType = {
  userId: string;
  payload: any;
};

export type patchIncidentTypeUpdateType = {
  incidentId: string;
  payload: {
    name: string;
  };
};

export type patchQuestionUpdateType = {
  id: string;
  payload: {
    question: string;
    questionType: string;
    questionCategoryId: string;
    active: boolean;
    options?: string[];
  };
};

export type patchQuestionTypeUpdateType = {
  id: string;
  payload: {
    name: string;
  };
};

export type patchDocumentUpdateType = {
  documentId: string | number;
  payload: {
    name: string;
    tags: string[];
  };
};

export type patchUserSettingType = {
  userId: string;
  payload: any;
};

export type patchOrganizationUpdateType = {
  orgId: string;
  payload: any;
};

export type patchEmailUpdateType = {
  userId: string;
  token: string;
};
