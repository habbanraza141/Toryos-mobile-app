import {Platform, Share} from 'react-native';
import RNFS from 'react-native-fs';
import {downloadFile} from './downloadFile';

interface InjuryData {
  id?: string;
  incidentRefId?: string;
  title?: string;
  fullName?: string;
  severity?: string;
  status?: string;
  investigationStatus?: string;
  correctiveActionStatus?: string;
  [key: string]: any;
}

export const exportInjuriesToCsv = async (
  injuries: InjuryData[],
  fileName?: string,
  maxInjuries?: number,
) => {
  try {
    const limit = maxInjuries || injuries.length;
    const incidentsToExport = injuries.slice(0, limit);

    const csvHeaders = [
      'Sr.',
      'Ref#',
      'Title',
      'Employee Affected',
      'Severity',
      'Investigation Status',
      'Corrective Action Status',
    ];

    const csvRows = [csvHeaders];

    incidentsToExport.forEach((injury, index) => {
      const row = [
        index + 1,
        injury.incidentRefId || 'N/A',
        injury.title || 'N/A',
        injury.fullName,
        injury.severity || 'N/A',
        injury.investigationStatus || 'Pending',
        injury.correctiveActionStatus || 'Unassigned',
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
    const defaultFileName = `EHS_Injuries_${timestamp}.csv`;
    const finalFileName = fileName || defaultFileName;
    if (Platform.OS === 'ios') {
      const filePath = `${RNFS.DocumentDirectoryPath}/${finalFileName}`;
      await RNFS.writeFile(filePath, csvContent, 'utf8');
      try {
        const shareResult = await Share.share({
          url: `file://${filePath}`,
          title: 'EHS Incidents Report (CSV)',
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
  } catch (error) {
    console.error('Error exporting injuries to CSV:', error);
    return {
      success: false,
      message: 'Failed to export injuries to CSV',
      shared: false,
    };
  }
};
