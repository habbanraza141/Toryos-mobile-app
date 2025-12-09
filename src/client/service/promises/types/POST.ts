type CloseIncidentPayload = {
  reason: string;
};

export type postCorrectiveActionAsDraftType = {
  incidnetId: string;
  payload?: any;
};

export type postCorrectiveActionAsDraftUpdateType = {
  incidentId: string;
  correctiveActionId: string;
  payload?: any;
};

export type postCorrectiveActionCreateType = {
  incidentId: string;
  payload?: any;
};

export type postSessionValidityType = {
  payload: {
    refresh: string;
    platform: string;
  };
};

export type postIncidentReportingType = {
  payload: any;
};

export type postCloseIncidentType = {
  incidentId: string | number;
  payload: any;
};

export type verifyDeleteAccountType = {
  payload: {
    userId: string;
    token: string;
  };
};

export type postReopenIncidentType = {
  incidentId: string | number;
  payload: any;
};

export type postRequestExtensionType = {
  correctiveActionId: string | number;
  payload: {
    description: string;
    files: any[];
  };
};

export type postIncidentType = {
  payload: {
    name: string;
  };
};

export type postQuestionType = {
  payload: {
    question: string;
    questionType: string;
    questionCategoryId: string;
    active: boolean;
    options?: string[];
  };
};

export type postQuestionCategoryType = {
  payload: {
    name: string;
  };
};

export type postIsEmailAlreadyExistType = {
  payload: {
    email: string;
  };
};

export type postInjuryReportingType = {
  incidentId: string | number;

  payload: {
    body: string;
    files?: string[];
  };
};
export type postDocumentType = {
  payload: any;
};
