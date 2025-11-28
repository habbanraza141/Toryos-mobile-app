export type PaginatedQueryParams = {
  pageNum: number | string;
  queryParams: string;
};
export type NotificationParamsType = {
  pageNum: number | string;
};

export type getIncidentOrganizationType = PaginatedQueryParams;
export type getActionAssignedByMeType = PaginatedQueryParams;
export type getActionOrganizationType = PaginatedQueryParams;
export type getActionAssignedToMeType = PaginatedQueryParams;
export type getMyIncidentsType = PaginatedQueryParams;
export type getDocumentsType = PaginatedQueryParams;
export type getMyInjuryIncidentsType = PaginatedQueryParams;

export type getIncidentType = {
  params: string
};
export type getQuestionType = {
  params: string
};
export type getAllQuestionsType = {
  params: string
};

export type getRemoveCardType = {
  userId: string
};

export type GetUserSubscriptionDetails = {
  userId: string
};

export type getCardDetailsType = {
  userId: string
};
export type getInvestigationReportType = {
  investigationId: string
};
