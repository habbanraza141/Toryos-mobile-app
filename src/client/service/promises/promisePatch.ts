import { apiPatch, extractAxiosErrorMessage } from '../services';
import { Response } from './../../../types/generalInterface';
import {
  patchCorrectiveActionUpdateType,
  patchEmailUpdateType,
  patchIncidentTypeUpdateType,
  patchOrganizationUpdateType,
  patchPasswordUpdateType,
  patchUserSettingType,
  patchQuestionUpdateType,
  patchQuestionTypeUpdateType,
  patchDocumentUpdateType,
} from './types/PATHC';

export const patchCorrectiveActionUpdate = async ({
  incidentId,
  correctiveActionId,
  payload,
}: patchCorrectiveActionUpdateType): Promise<Response> => {
  try {
    const data = await apiPatch(
      '/corrective-action/' + incidentId + '/update/' + correctiveActionId,
      payload,
    );
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const patchPasswordUpdate = async ({
  userId,
  payload,
}: patchPasswordUpdateType): Promise<Response> => {
  try {
    const data = await apiPatch(
      `/user-settings/${userId}/update-password`,
      payload,
    );
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const patchIncidentTypeUpdate = async ({
  incidentId,
  payload,
}: patchIncidentTypeUpdateType): Promise<Response> => {
  try {
    const data = await apiPatch(
      `/custom-incident-types/${incidentId}`,
      payload,
    );
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const patchQuestionUpdate = async ({
  id,
  payload,
}: patchQuestionUpdateType): Promise<Response> => {
  try {
    const data = await apiPatch(`/investigation-question/${id}`, payload);
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const patchQuestionTypesUpdate = async ({
  id,
  payload,
}: patchQuestionTypeUpdateType): Promise<Response> => {
  try {
    const data = await apiPatch(
      `/investigation-question-category/${id}`,
      payload,
    );
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const patchUserSetting = async ({
  userId,
  payload,
}: patchUserSettingType): Promise<Response> => {
  try {
    const data = await apiPatch(`/user-settings/${userId}`, payload);
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const patchOrganizationUpdate = async ({
  orgId,
  payload,
}: patchOrganizationUpdateType): Promise<Response> => {
  try {
    const data = await apiPatch(
      `/user-settings/organization/${orgId}`,
      payload,
    );
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const patchEmailUpdate = async ({
  userId,
  token,
}: patchEmailUpdateType): Promise<Response> => {
  try {
    const data = await apiPatch(
      `/user-settings/${userId}/email-update/${token}`,
    );
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const patchDocumentUpdate = async ({
  documentId,
  payload,
}: patchDocumentUpdateType): Promise<Response> => {
  try {
    const data = await apiPatch(`/document-library/${documentId}`, payload);
    return { success: true, data };
  } catch (err: unknown) {
    console.log(err);

    return { success: false, error: extractAxiosErrorMessage(err) };
  }
};

export const patchInjuryReporting = async ({
  payload,
  investigationId,
}: {
  payload: any;
  investigationId: string;
}): Promise<Response> => {
  try {
    const data = await apiPatch(
      `/investigation-reporting/${investigationId}`,
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
