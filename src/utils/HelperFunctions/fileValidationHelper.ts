import { Platform } from "react-native";
import * as Sentry from '@sentry/react-native';

export interface FileObject {
    uri: string;
    name?: string;
    type?: string;
    size?: number;
    fileSize?: number;
    error?: boolean;
    errorMessage?: string;
}

export const validateFileObject = (file: any): FileObject | null => {
    try {
        if (!file || typeof file !== 'object') {
            console.warn('📁 Invalid file object:', file);
            return null;
        }

        if (!file.uri || typeof file.uri !== 'string') {
            console.warn('📁 File missing URI:', file);
            return null;
        }

        const validatedFile: FileObject = {
            uri: file.uri,
            name: file.name || file.fileName || `file_${Date.now()}`,
            type: file.type || 'application/octet-stream',
            size: file.size || file.fileSize || 0,
            fileSize: file.fileSize || file.size || 0,
        };

        if (!validatedFile.size || validatedFile.size <= 0) {
            console.warn('📁 File has invalid size:', validatedFile);
            validatedFile.error = true;
            validatedFile.errorMessage = 'Invalid file size';
        }

        return validatedFile;
    } catch (error) {
Sentry.captureException(error) 
        console.error('📁 Error validating file object:', error, file);
        return null;
    }
};

export const validateFileArray = (files: any[]): FileObject[] => {
    try {
        if (!Array.isArray(files)) {
            console.warn('📁 Files is not an array:', files);
            return [];
        }

        const validatedFiles: FileObject[] = [];

        files.forEach((file, index) => {
            const validatedFile = validateFileObject(file);
            if (validatedFile) {
                validatedFiles.push(validatedFile);
            } else {
                console.warn(`📁 Skipping invalid file at index ${index}:`, file);
            }
        });

        return validatedFiles;
    } catch (error) {
Sentry.captureException(error) 

        console.error('📁 Error validating file array:', error);
        return [];
    }
};

export const createFormDataFile = (file: FileObject, index: number) => {
    try {
        return {
            uri: file.uri,
            type: file.type || 'application/octet-stream',
            name: file.name || `file-${index}`,
        };
    } catch (error) {
Sentry.captureException(error) 

        console.error('📁 Error creating FormData file:', error, file);
        return null;
    }
};

export const logFileInfo = (files: FileObject[], context: string) => {
    console.log(`📁 ${context} - File count:`, files.length);
    files.forEach((file, index) => {
        console.log(`📁 File ${index + 1}:`, {
            name: file.name,
            type: file.type,
            size: file.size,
            uri: file.uri?.substring(0, 50) + '...',
            error: file.error,
            errorMessage: file.errorMessage
        });
    });
}; 