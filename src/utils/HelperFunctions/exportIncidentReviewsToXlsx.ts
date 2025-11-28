import ExcelJS from 'exceljs';
import RNFS from 'react-native-fs';
import { Platform, Share } from 'react-native';
import { downloadFile } from './downloadFile';
import moment from 'moment';
import { Buffer } from 'buffer';
import { colors } from '../../theme/colors';
import { LOGO_BASE64 } from './base64';
import * as Sentry from '@sentry/react-native';


interface IncidentData {
  id: string;
  title: string;
  date?: string;
  incidentType?: string;
  status?: string;
  severity?: string;
  createdAt?: string;
  [key: string]: any;
}

export const exportIncidentReviewsToXlsx = async (
  incidents: IncidentData[],
  fileName?: string,
  maxIncidents?: number,
) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Incidents');

    const imageId = workbook.addImage({
      base64: LOGO_BASE64,
      extension: 'png',
    });

    sheet.addImage(imageId, {
      tl: { col: 3.44, row: 0.24 },
      ext: { width: 80, height: 110 },
    });

    sheet.mergeCells('A1:G1');
    sheet.getRow(1).height = 90;

    const imageCell = sheet.getCell('A1');
    imageCell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };

    imageCell.border = {
      top: { style: 'thin', color: { argb: 'e1e1e7' } },
      left: { style: 'thin', color: { argb: 'e1e1e7' } },
      bottom: { style: 'thin', color: { argb: 'e1e1e7' } },
      right: { style: 'thin', color: { argb: 'e1e1e7' } },
    };

    const headingRow = sheet.addRow(['EHS Navigator']);
    sheet.mergeCells('A2:G2');
    headingRow.height = 40;
    headingRow.getCell(1).font = {
      size: 28,
      bold: true,
      color: { argb: '3957DF' },
    };
    headingRow.getCell(1).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    headingRow.border = {
      top: { style: 'thin', color: { argb: 'e1e1e7' } },
      left: { style: 'thin', color: { argb: 'e1e1e7' } },
      bottom: { style: 'thin', color: { argb: 'e1e1e7' } },
      right: { style: 'thin', color: { argb: 'e1e1e7' } },
    };

    const subHeadingRow = sheet.addRow([
      'Review all incidents from this list and assign corrective actions.',
    ]);
    sheet.mergeCells('A3:G3');
    sheet.getRow(3).height = 25;
    subHeadingRow.getCell(1).font = {
      size: 15,
      color: { argb: 'FF000000' },
    };
    subHeadingRow.getCell(1).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    subHeadingRow.border = {
      top: { style: 'thin', color: { argb: 'e1e1e7' } },
      left: { style: 'thin', color: { argb: 'e1e1e7' } },
      bottom: { style: 'thin', color: { argb: 'e1e1e7' } },
      right: { style: 'thin', color: { argb: 'e1e1e7' } },
    };

    const dateCell = sheet.getCell('A4');
    sheet.mergeCells('A4:G4');
    sheet.getRow(4).height = 25;
    dateCell.value = `Date of Export: ${moment().format('MMM D, YYYY')}`;
    dateCell.font = { name: 'Roboto', size: 13, bold: true };
    dateCell.alignment = { vertical: 'middle', horizontal: 'center' };

    dateCell.border = {
      top: { style: 'thin', color: { argb: 'e1e1e7' } },
      left: { style: 'thin', color: { argb: 'e1e1e7' } },
      bottom: { style: 'thin', color: { argb: 'e1e1e7' } },
      right: { style: 'thin', color: { argb: 'e1e1e7' } },
    };

    for (let i = 1; i <= 4; i++) {
      const row = sheet.getRow(i);
      for (let j = 1; j <= 7; j++) {
        const cell = row.getCell(j);
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF7F8F9' },
        };
      }
    }

    const headerRow = sheet.addRow([
      'Sr.',
      'Ref#',
      'Incident/Hazard',
      'Date of Report',
      'Type',
      'Status',
      'Severity',
    ]);
    headerRow.height = 25;

    sheet.columns = [
      { key: 'sr', width: 6 },
      { key: 'ref', width: 18 },
      { key: 'title', width: 30 },
      { key: 'date', width: 20 },
      { key: 'type', width: 25 },
      { key: 'status', width: 15 },
      { key: 'severity', width: 15 },
    ];

    headerRow.eachCell(cell => {
      cell.font = { bold: true, color: { argb: 'FF000000' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF1F3F5' },
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'thin', color: { argb: 'e1e1e7' } },
        left: { style: 'thin', color: { argb: 'e1e1e7' } },
        bottom: { style: 'thin', color: { argb: 'e1e1e7' } },
        right: { style: 'thin', color: { argb: 'e1e1e7' } },
      };
    });

    const limit = maxIncidents || incidents.length;
    const incidentsToExport = incidents.slice(0, limit);

    incidentsToExport.forEach((incident, index) => {
      const createdDate = incident.date
        ? moment(incident.date).format('DD/MM/YYYY')
        : 'N/A';

      const row = sheet.addRow([
        index + 1,
        incident.incidentRefId || 'N/A',
        incident.title || 'N/A',
        createdDate,
        incident.incidentType || 'N/A',
        incident.status || 'N/A',
        incident.severity || 'N/A',
      ]);

      row.getCell(1).alignment = { horizontal: 'center' };
      row.getCell(4).alignment = { horizontal: 'center' };
      row.getCell(5).alignment = { horizontal: 'center' };
      row.getCell(6).alignment = { horizontal: 'center' };
      row.getCell(7).alignment = { horizontal: 'center' };

      const status = (incident.status || '').toLowerCase();
      const severity = (incident.severity || '').toLowerCase();

      const statusCell = row.getCell(6);
      if (status === 'active') statusCell.font = { color: { argb: colors.danger } };
      else if (status === 'in progress')
        statusCell.font = { color: { argb: colors.primary } };
      else if (status === 'closed')
        statusCell.font = { color: { argb: colors.green } };
      const severityCell = row.getCell(7);
      if (severity === 'major')
        severityCell.font = { color: { argb: colors.textOrange } };
      else if (severity === 'moderate')
        severityCell.font = { color: { argb: colors.yellow } };
      else if (severity === 'critical')
        severityCell.font = { color: { argb: colors.danger } };
      else if (severity === 'low')
        severityCell.font = { color: { argb: colors.green } };
    });

    const timestamp = new Date().getTime();
    const finalFileName = fileName || `EHS_Incidents_${timestamp}.xlsx`;

    const buffer = await workbook.xlsx.writeBuffer();
    const base64Data = Buffer.from(buffer).toString('base64');

    if (Platform.OS === 'ios') {
      try {
        const filePath = `${RNFS.DocumentDirectoryPath}/${finalFileName}`;
        await RNFS.writeFile(filePath, base64Data, 'base64');
        const shareResult = await Share.share({
          url: `file://${filePath}`,
          title: 'EHS Incidents Report',
        });

        if (shareResult.action === Share.sharedAction) {
          return {
            success: true,
            message: 'File exported and shared successfully',
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

        return {
          success: true,
          message:
            'File exported but sharing failed. File is saved in app documents.',
          shared: false,
        };
      }
    } else {
      return await downloadFile({
        uri: null,
        fileName: finalFileName,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        extension: 'xlsx',
        content: base64Data,
        encoding: 'base64',
      });
    }
  } catch (error: any) {
    Sentry.captureException(error)
    console.log('Export incidents to XLSX error:', error);
    return {
      success: false,
      message: `Failed to export incidents: ${error.message}`,
      error,
    };
  }
};
