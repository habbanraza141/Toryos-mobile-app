import { apiPost, extractAxiosErrorMessage } from '../services';
import { Response } from './../../../types/generalInterface';
import {
    postCloseIncidentType,
    postCorrectiveActionAsDraftType,
    postCorrectiveActionAsDraftUpdateType,
    postCorrectiveActionCreateType,
    postIncidentReportingType,
    postIncidentType,
    postIsEmailAlreadyExistType,
    postReopenIncidentType,
    postRequestExtensionType,
    postSessionValidityType,
    postQuestionType,
    postQuestionCategoryType,
    postInjuryReportingType,
    postDocumentType,
    verifyDeleteAccountType,
} from './types/POST';

export const postCorrectiveActionAsDraft = async ({
    incidnetId,
    payload,
}: postCorrectiveActionAsDraftType): Promise<Response> => {
    try {
        const data = await apiPost(
            '/corrective-action/' + incidnetId + '/create',
            payload,
        );
        return { success: true, data };
    } catch (err: unknown) {
        return { success: false, error: extractAxiosErrorMessage(err) };
    }
};

export const postCorrectiveActionAsDraftUpdate = async ({
    incidentId,
    correctiveActionId,
    payload,
}: postCorrectiveActionAsDraftUpdateType): Promise<Response> => {
    try {
        const data = await apiPost(
            '/corrective-action/' +
            incidentId +
            '/update-draft/' +
            correctiveActionId,
            payload,
        );
        return { success: true, data };
    } catch (err: unknown) {
        return { success: false, error: extractAxiosErrorMessage(err) };
    }
};

export const postCorrectiveActionCreate = async ({
    incidentId,
    payload,
}: postCorrectiveActionCreateType): Promise<Response> => {
    try {
        const data = await apiPost(
            '/corrective-action/' + incidentId + '/create',
            payload,
        );
        return { success: true, data };
    } catch (err: unknown) {
        return { success: false, error: extractAxiosErrorMessage(err) };
    }
};

export const postSessionValidity = async ({
    payload,
}: postSessionValidityType): Promise<Response> => {
    try {
        const data = await apiPost('/auth/session-validity', payload);
        return { success: true, data };
    } catch (err: unknown) {
        return { success: false, error: extractAxiosErrorMessage(err) };
    }
};

export const postRefreshToken = async ({
    payload,
}: postSessionValidityType): Promise<Response> => {
    try {
        const data = await apiPost('/auth/refresh', payload);
        return { success: true, data };
    } catch (err: unknown) {
        return { success: false, error: extractAxiosErrorMessage(err) };
    }
};

export const postIncidentReporting = async ({
    payload,
}: postIncidentReportingType): Promise<Response> => {
    try {
        const data = await apiPost('/incident-reporting', payload);
        return { success: true, data };
    } catch (err: unknown) {
        return { success: false, error: extractAxiosErrorMessage(err) };
    }
};

export const postIncidentReportingDraft = async ({
    payload,
}: postIncidentReportingType): Promise<Response> => {
    try {
        const data = await apiPost('/incident-reporting/draft', payload);
        return { success: true, data };
    } catch (err: unknown) {
        return { success: false, error: extractAxiosErrorMessage(err) };
    }
};

export const postCloseIncident = async ({
    incidentId,
    payload,
}: postCloseIncidentType): Promise<Response> => {
    try {
        const data = await apiPost(
            `/incident-reporting/${incidentId}/close-incident`,
            payload,
        );
        return { success: true, data };
    } catch (err: unknown) {
        return { success: false, error: extractAxiosErrorMessage(err) };
    }
};

export const postReopenIncident = async ({
    incidentId,
    payload,
}: postReopenIncidentType): Promise<Response> => {
    try {
        const data = await apiPost(
            `/incident-reporting/${incidentId}/reopen-incident`,
            payload,
        );
        return { success: true, data };
    } catch (err: unknown) {
        return { success: false, error: extractAxiosErrorMessage(err) };
    }
};

export const postRequestExtension = async ({
    correctiveActionId,
    payload,
}: postRequestExtensionType): Promise<Response> => {
    const formData = new FormData();
    formData.append('description', payload.description);

    if (payload.files && payload.files.length > 0) {
        payload.files.forEach((file: any, index: number) => {
            formData.append('files', {
                uri: file.uri,
                type: file.type || 'application/octet-stream',
                name: file.name || `file-${index}`,
            });
        });
    }
    try {
        const data = await apiPost(
            `/corrective-action/${correctiveActionId}/request-extension`,
            payload,
        );
        return { success: true, data };
    } catch (err: unknown) {
        return { success: false, error: extractAxiosErrorMessage(err) };
    }
};

export const postIncidentTypes = async ({
    payload,
}: postIncidentType): Promise<Response> => {
    try {
        const data = await apiPost(`/custom-incident-types`, payload);
        console.log({ data });

        return { success: true, data };
    } catch (err: unknown) {
        return { success: false, error: extractAxiosErrorMessage(err) };
    }
};

export const postQuestionTypes = async ({
    payload,
}: postQuestionCategoryType): Promise<Response> => {
    try {
        const data = await apiPost(`/investigation-question-category`, payload);
        return { success: true, data };
    } catch (err: unknown) {
        return { success: false, error: extractAxiosErrorMessage(err) };
    }
};

export const postQuestion = async ({
    payload,
}: postQuestionType): Promise<Response> => {
    try {
        const data = await apiPost(`/investigation-question`, payload);
        return { success: true, data };
    } catch (err: unknown) {
        return { success: false, error: extractAxiosErrorMessage(err) };
    }
};

export const postIsEmailAlreadyExist = async ({
    payload,
}: postIsEmailAlreadyExistType): Promise<Response> => {
    try {
        const data = await apiPost('/auth/email-exist', payload);
        return { success: true, data };
    } catch (err: unknown) {
        return { success: false, error: extractAxiosErrorMessage(err) };
    }
};

export const postInjuryReporting = async ({
    payload,
    incidentId,
}: postInjuryReportingType): Promise<Response> => {
    try {
        const isFormData =
            typeof FormData !== 'undefined' && (payload as any) instanceof FormData;
        const options = isFormData
            ? { headers: { 'Content-Type': 'multipart/form-data' } }
            : undefined;
        const data = await apiPost(
            `/investigation-reporting/${incidentId}`,
            payload as any,
            options,
        );
        return { success: true, data };
    } catch (err: unknown) {
        console.log({ err });

        return { success: false, error: extractAxiosErrorMessage(err) };
    }
};
export const postDocument = async ({
    payload,
}: postDocumentType): Promise<Response> => {
    try {
        const isFormData =
            typeof FormData !== 'undefined' && (payload as any) instanceof FormData;
        const options = isFormData
            ? { headers: { 'Content-Type': 'multipart/form-data' } }
            : undefined;
        const data = await apiPost(
            '/document-library',
            payload as any,
            options,
        );
        return { success: true, data };
    } catch (err: unknown) {
        console.log({ err });

        return { success: false, error: extractAxiosErrorMessage(err) };
    }
};

export const verifyDeleteAccount = async ({
    payload
}: verifyDeleteAccountType): Promise<Response> => {
    try {
        const data = await apiPost(
            '/user-settings/verify-delete-account', payload
        );
        return { success: true, data };
    } catch (err: unknown) {
        return { success: false, error: extractAxiosErrorMessage(err) };
    }
};