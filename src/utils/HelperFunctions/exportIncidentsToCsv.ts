import RNFS from 'react-native-fs';
import { Platform, Share } from 'react-native';
import { downloadFile } from './downloadFile';
import moment from 'moment';
import * as Sentry from '@sentry/react-native';

interface IncidentData {
  id: string;
  title: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
  status?: string;
  severity?: string;
  incidentType?: string;
  department?: string;
  reportedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export const exportIncidentsToCsv = async (
  incidents: IncidentData[],
  fileName?: string,
  maxIncidents?: number,
) => {
  try {
    const limit = maxIncidents || incidents.length;
    const incidentsToExport = incidents.slice(0, limit);

    const csvHeaders = [
      'Sr.',
      'Ref#',
      'Incident/Hazard',
      'Date of Report',
      'Type',
      'Severity',
      'Status',
    ];

    const csvRows = [csvHeaders];

    incidentsToExport.forEach((incident, index) => {
      const createdDate = incident.date
        ? moment(incident.date).format('DD/MM/YYYY')
        : 'N/A';

      const row = [
        index + 1,
        incident.incidentRefId || 'N/A',
        incident.title || 'N/A',
        createdDate,
        incident.incidentType || 'N/A',
        incident.severity || 'N/A',
        incident.status || 'N/A',
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
    const defaultFileName = `EHS_Incidents_${timestamp}.csv`;
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
        console.error(shareError)
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
    console.error(error)
    console.error('Export incidents to CSV error:', error);
    return {
      success: false,
      message: `Failed to export incidents to CSV: ${error.message}`,
      error: error,
    };
  }
};
