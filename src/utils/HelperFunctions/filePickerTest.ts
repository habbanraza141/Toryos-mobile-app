import { Platform } from "react-native";
import { openFiles } from "./filePickerHelper";
import * as Sentry from '@sentry/react-native';

export const testFilePicker = async () => {
    console.log('🧪 Starting file picker test...');
    console.log('🧪 Platform:', Platform.OS);
    console.log('🧪 Is iPad:', Platform.OS === 'ios' && Platform.isPad);
    
    try {
        const result = await openFiles(1);
        console.log('🧪 Test result:', result);
        return result;
    } catch (error) {
Sentry.captureException(error) 
        console.error('🧪 Test error:', error);
        return {
            success: false,
            files: [],
            message: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

export const getPlatformInfo = () => {
    return {
        platform: Platform.OS,
        isIPad: Platform.OS === 'ios' && Platform.isPad,
        version: Platform.Version,
        constants: Platform.constants
    };
}; 