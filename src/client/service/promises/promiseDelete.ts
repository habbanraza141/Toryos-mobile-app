import { apiDelete, extractAxiosErrorMessage } from '../services';
import {
  deleteDraftCorrectiveActionType,
  deleteIncidentReportingType,
  deleteIncidentTypesType,
  deleteDocumentType,
  deleteAccountType,
} from './types/DELETE';
import { Response } from './../../../types/generalInterface';

export const deleteDraftCorrectiveAction = async ({
  correctiveActionId,
}: deleteDraftCorrectiveActionType): Promise<Response> => {
  try {
    const data = await apiDelete(
      '/corrective-action/delete-draft/' + correctiveActionId,
    );
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const deleteIncidentReporting = async ({
  incidentId,
}: deleteIncidentReportingType): Promise<Response> => {
  try {
    const data = await apiDelete('/incident-reporting/' + incidentId);
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const deleteIncidentTypes = async ({
  incidentId,
}: deleteIncidentTypesType): Promise<Response> => {
  try {
    const data = await apiDelete('/custom-incident-types/' + incidentId);
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};


export const deleteQuestionTypes = async ({ incidentId }: deleteIncidentTypesType): Promise<Response> => {
  try {
    const data = await apiDelete('/investigation-question-category/' + incidentId);
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const deleteQuestion = async ({ incidentId }: deleteIncidentTypesType): Promise<Response> => {
  try {
    const data = await apiDelete('/investigation-question/' + incidentId);
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};


export const deleteDocument = async ({
  documentId,
}: deleteDocumentType): Promise<Response> => {
  try {
    const data = await apiDelete('/document-library/' + documentId);
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};


export const deleteAccount = async ({
  id,
}: deleteAccountType): Promise<Response> => {
  try {
    const data = await apiDelete('/user-settings/' + id);
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};
