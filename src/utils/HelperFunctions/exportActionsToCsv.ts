import RNFS from 'react-native-fs';
import { Platform, Share } from 'react-native';
import { downloadFile } from './downloadFile';
import moment from 'moment';
import { components } from '@EHSNavigator/types';
import * as Sentry from '@sentry/react-native';

interface CorrectiveActionData {
  id: string;
  correctActionRefId: string;
  assignedBy?: string;
  title: string;
  dueDate?: string;
  department?: string;
  status?: string;
  priority?: string;
}

export const exportActionsToCsv = async (
  correctiveActions: CorrectiveActionData[],
  fileName?: string,
  maxCorrectiveActions?: number,
) => {
  try {
    const limit =
      typeof maxCorrectiveActions === 'number' &&
        Number.isFinite(maxCorrectiveActions) &&
        maxCorrectiveActions > 0
        ? Math.min(Math.floor(maxCorrectiveActions), correctiveActions.length)
        : correctiveActions.length;
    const correctiveActionsToExport = correctiveActions.slice(0, limit);

    const csvHeaders = [
      'Sr.',
      'Ref#',
      'Corrective Action',
      'Assigned By',
      'Department',
      'Due Date',
      'Status',
      'Priority',
    ];

    const csvRows = [csvHeaders];

    correctiveActionsToExport.forEach((correctiveAction, index) => {
      const row = [
        index + 1,
        correctiveAction.correctActionRefId || 'N/A',
        correctiveAction.title || 'N/A',
        correctiveAction.assignedBy || 'N/A',
        correctiveAction.department || 'N/A',
        correctiveAction.dueDate || 'N/A',
        correctiveAction.status || 'N/A',
        correctiveAction.priority || 'N/A',
      ];

      const escapedRow = row.map(value => {
        const stringValue = String(value);
        if (
          stringValue.includes(',') ||
          stringValue.includes('"') ||
          stringValue.includes('\n')
        ) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      });

      csvRows.push(escapedRow);
    });

    const csvContent = csvRows.map(row => row.join(',')).join('\n');

    const timestamp = new Date().getTime();
    const defaultFileName = `EHS_CorrectiveActions_${timestamp}.csv`;
    const finalFileName = fileName || defaultFileName;

    if (Platform.OS === 'ios') {
      const filePath = `${RNFS.DocumentDirectoryPath}/${finalFileName}`;
      await RNFS.writeFile(filePath, csvContent, 'utf8');

      try {
        const shareResult = await Share.share({
          url: `file://${filePath}`,
          title: 'EHS Corrective Actions Report (CSV)',
          message: `EHS Corrective Actions Report - ${correctiveActionsToExport.length} corrective actions exported as CSV`,
        });

        if (shareResult.action === Share.sharedAction) {
          return {
            success: true,
            message: 'CSV file exported and shared successfully',
            path: filePath,
            shared: true,
          };
        } else {
          return {
            success: false,
            message: 'File export cancelled by user',
            path: filePath,
            shared: false,
          };
        }
      } catch (shareError) {
                                Sentry.captureException(shareError) 

        console.error('Share error:', shareError);
        return {
          success: true,
          message:
            'CSV file exported but sharing failed. File is saved in app documents.',
          path: filePath,
          shared: false,
        };
      }
    } else {

      const downloadResult = await downloadFile({
        uri: null,
        fileName: finalFileName,
        type: 'text/csv',
        extension: 'csv',
        content: csvContent,
        encoding: 'utf8',
      });

      return downloadResult;
    }
  } catch (error: any) {
      Sentry.captureException(error) 
    console.error('Export incidents to CSV error:', error);
    return {
      success: false,
      message: `Failed to export corrective actions to CSV: ${error.message}`,
      error: error,
    };
  }
};
