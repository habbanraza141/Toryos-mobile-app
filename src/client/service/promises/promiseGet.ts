import { apiGet, extractAxiosErrorMessage } from '../services';
import { Response } from './../../../types/generalInterface';
import {
  getActionAssignedByMeType,
  getActionAssignedToMeType,
  getActionOrganizationType,
  getIncidentOrganizationType,
  getMyIncidentsType,
  getIncidentType,
  getRemoveCardType,
  getCardDetailsType,
  NotificationParamsType,
  getMyInjuryIncidentsType,
  getQuestionType,
  getAllQuestionsType,
  getInvestigationReportType,
  getDocumentsType
} from './types/GET';

export const getOrganizationIncidents = async () => {
  try {
    const data = await apiGet('/incident-reporting/organization');
    console.log({ data });

    return data;
  } catch (err: unknown) {
    console.log({ err });

    return extractAxiosErrorMessage(err);
  }
};

export const getDraftCorrectiveActions = async (): Promise<Response> => {
  try {
    const data = await apiGet('/corrective-action/draft');
    console.log({ data });
    return { success: true, data };

  } catch (err: unknown) {
    console.log({ err });

    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const getIncidentOrganization = async ({
  pageNum,
  queryParams,
}: getIncidentOrganizationType): Promise<Response> => {
  try {
    const data = await apiGet(
      `/incident-reporting/organization?page=${pageNum}&${queryParams}`,
    );
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const getActionAssignedByMe = async ({
  pageNum,
  queryParams,
}: getActionAssignedByMeType): Promise<Response> => {
  try {
    const data = await apiGet(
      `/corrective-action/assigned-by-me?page=${pageNum}&${queryParams}`,
    );
    console.log({ data });

    return { success: true, data };
  } catch (err: unknown) {
    console.log({ err });

    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const getActionOrganization = async ({
  pageNum,
  queryParams,
}: getActionOrganizationType): Promise<Response> => {
  try {
    const data = await apiGet(
      `/corrective-action/organization?page=${pageNum}&${queryParams}`,
    );
    console.log({ data });

    return { success: true, data };
  } catch (err: unknown) {
    console.log({ err });

    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const getActionAssignedToMe = async ({
  pageNum,
  queryParams,
}: getActionAssignedToMeType): Promise<Response> => {
  try {
    const data = await apiGet(
      `/corrective-action/assigned-to-me?page=${pageNum}&${queryParams}`,
    );
    console.log({ data });

    return { success: true, data };
  } catch (err: unknown) {
    console.log({ err });

    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const getIncidentTypes = async (): Promise<Response> => {
  try {
    const data = await apiGet('/incident-reporting/incident-types');
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const getQuestionTypes = async (): Promise<Response> => {
  try {
    const data = await apiGet('/investigation-question/category');
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const getStatisticsInsights = async (): Promise<Response> => {
  try {
    const data = await apiGet('/statistics/home-insights');
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const getMyIncidents = async ({
  pageNum = 1,
  queryParams = '',
}: getMyIncidentsType): Promise<Response> => {
  try {
    const data = await apiGet(
      '/incident-reporting/my-incidents?page=' +
      pageNum +
      '&' +
      (queryParams === '' ? '' : queryParams),
    );
    console.log({ data });

    return { success: true, data };
  } catch (err: unknown) {
    console.log({ err });

    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};
export const getDocuments = async ({ pageNum = 1, queryParams = '' }: getDocumentsType): Promise<Response> => {
  try {
    const data = await apiGet('/document-library?page=' + pageNum + '&' + (queryParams === '' ? '' : queryParams));
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const getMyInjuryIncidents = async ({ pageNum = 1, queryParams = '' }: getMyInjuryIncidentsType): Promise<Response> => {
  try {
    const data = await apiGet('/investigation-reporting/injuries?page=' + pageNum + '&' + (queryParams === '' ? '' : queryParams));
    console.log({ data });

    return { success: true, data };

  } catch (err: unknown) {
    console.log({ err });

    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};
export const getEmployeeHours = async (): Promise<Response> => {
  try {
    const data = await apiGet('/user-settings/employee-working-hours');
    console.log({ data });

    return { success: true, data };

  } catch (err: unknown) {
    console.log({ err });

    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};


export const getInvestigationReport = async ({ investigationId }: getInvestigationReportType): Promise<Response> => {
  try {
    const data = await apiGet('/investigation-reporting/' + investigationId);
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};



export const getMyNotifications = async ({
  pageNum = 1,
}: NotificationParamsType): Promise<Response> => {
  try {
    const data = await apiGet('/notification?page=' + pageNum);
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};
export const getIncidentTypess = async ({
  params = '',
}: getIncidentType): Promise<Response> => {
  try {
    const data = await apiGet(
      '/custom-incident-types' + (params === '' ? '' : '?search=' + params),
    );
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};
export const getQuestionTypess = async ({ params = '' }: getQuestionType): Promise<Response> => {
  try {
    const data = await apiGet('/investigation-question-category' + (params === '' ? '' : '?search=' + params));
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};
export const getAllQuestions = async ({ params = '' }: getAllQuestionsType): Promise<Response> => {
  try {
    const data = await apiGet('/investigation-question' + (params === '' ? '' : '?search=' + params));
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const getRemoveCard = async ({
  userId = '',
}: getRemoveCardType): Promise<Response> => {
  try {
    const data = await apiGet('/user-settings/' + userId + '/remove-card');
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const getCardDetails = async ({
  userId,
}: getCardDetailsType): Promise<Response> => {
  try {
    const data = await apiGet(
      '/user-settings/' + userId + '/subscription-details',
    );
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const getRequiredModal = async (): Promise<Response> => {
  try {
    const data = await apiGet(
      '/stripe/require-modal',
    );
    console.log({ data });

    return { success: true, data };
  } catch (err: unknown) {
    console.log({ err });

    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const getStatistics = async (): Promise<Response> => {
  try {
    const data = await apiGet('/statistics');
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const getStatisticsCharts = async (params?: any): Promise<Response> => {
  try {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const data = await apiGet('/statistics/charts' + query);
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const getStripeProducts = async (): Promise<Response> => {
  try {
    const data = await apiGet('/stripe/products');
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const getUserVerify = async (params: {
  userId: string;
  token: string;
  platform?: string;
}): Promise<Response> => {
  try {
    const qs = new URLSearchParams({
      userId: params.userId,
      token: params.token,
      ...(params.platform ? { platform: params.platform } : {}),
    }).toString();
    const data = await apiGet('/auth/verify' + `?${qs}`);
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export type GetUserSubscriptionDetails = { userId: string };
export const getUserSubscriptionDetails = async ({
  userId,
}: GetUserSubscriptionDetails): Promise<Response> => {
  try {
    const data = await apiGet(
      '/user-settings/' + userId + '/subscription-details',
    );
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};
