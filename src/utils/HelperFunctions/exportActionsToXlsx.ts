import ExcelJS from 'exceljs';
import RNFS from 'react-native-fs';
import { Platform, Share } from 'react-native';
import { downloadFile } from './downloadFile';
import moment from 'moment';
import { Buffer } from 'buffer';
import { colors } from '../../theme/colors';
import { components } from '@EHSNavigator/types';
import { LOGO_BASE64 } from './base64';
import * as Sentry from '@sentry/react-native';


interface CorrectiveActionData {
  id: string;
  correctActionRefId: string;
  title: string;
  assignedBy?: string;
  dueDate?: string;
  department?: string;
  status?: string;
  priority?: string;
}

export const exportActionsToXlsx = async (
  correctiveActions: CorrectiveActionData[],
  fileName?: string,
  exportType?: 'all' | 'reported' | 'assigned',
  maxIncidents?: number,
) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('correctiveActions');

    const imageId = workbook.addImage({
      base64: LOGO_BASE64,
      extension: 'png',
    });

    sheet.addImage(imageId, {
      tl: { col: 3.44, row: 0.24 },
      ext: { width: 80, height: 110 },
    });

    sheet.mergeCells('A1:H1');
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
    sheet.mergeCells('A2:H2');
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

    let subHeadingText =
      'All correctiveActions that have been reported by you are listed here';

    if (exportType === 'all') {
      subHeadingText =
        'Review all corrective actions that have been assigned to employees from this list';
    } else if (exportType === 'reported') {
      subHeadingText =
        'Review all corrective actions that you have assigned to employees from this list';
    } else if (exportType === 'assigned') {
      subHeadingText =
        'Review all corrective actions assigned to you by your manager from this list and take action on them';
    }

    const subHeadingRow = sheet.addRow([subHeadingText]);
    sheet.mergeCells('A3:H3');
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
    sheet.mergeCells('A4:H4');
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
      for (let j = 1; j <= 8; j++) {
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
      'Corrective Action',
      'Assigned By',
      'Department',
      'Due Date',
      'Status',
      'Priority',
    ]);
    headerRow.height = 25;

    sheet.columns = [
      { header: 'Sr.', key: 'sr', width: 8 },
      { header: 'Ref#', key: 'ref', width: 18 },
      { header: 'Corrective Action', key: 'title', width: 35 },
      { header: 'Assigned By', key: 'assignedBy', width: 15 },
      { header: 'Department', key: 'department', width: 20 },
      { header: 'Due Date', key: 'dueDate', width: 18 },
      { header: 'Status', key: 'status', width: 20 },
      { header: 'Priority', key: 'priority', width: 15 },
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

    const limit = maxIncidents || correctiveActions.length;
    const correctiveActionsToExport = correctiveActions.slice(0, limit);

    correctiveActionsToExport.forEach((correctiveAction, index) => {
      const row = sheet.addRow([
        index + 1,
        correctiveAction.correctActionRefId || 'N/A',
        correctiveAction.title || 'N/A',
        correctiveAction.assignedBy || 'N/A',
        correctiveAction.department || 'N/A',
        correctiveAction.dueDate || 'N/A',
        correctiveAction.status || 'N/A',
        correctiveAction.priority || 'N/A',
      ]);
      row.getCell(1).alignment = { horizontal: 'center' };
      row.getCell('assignedBy').alignment = { horizontal: 'center' };
      row.getCell('department').alignment = { horizontal: 'center' };
      row.getCell('dueDate').alignment = { horizontal: 'center' };
      row.getCell('status').alignment = { horizontal: 'center' };
      row.getCell('priority').alignment = { horizontal: 'center' };

      const status = (correctiveAction.status || '').toLowerCase();
      const priority = (correctiveAction.priority || '').toLowerCase();

      const statusCell = row.getCell(7);
      if (status === 'active') statusCell.font = { color: { argb: colors.danger } };
      else if (status === 'in review')
        statusCell.font = { color: { argb: colors.primary } };
      else if (status === 'extension approved')
        statusCell.font = { color: { argb: colors.primary } };
      else if (status === 'rejected')
        statusCell.font = { color: { argb: colors.danger } };
      else if (status === 'extension rejected')
        statusCell.font = { color: { argb: colors.primary } };
      else if (status === 'request extension')
        statusCell.font = { color: { argb: colors.primary } };
      else if (status === 'closed')
        statusCell.font = { color: { argb: colors.green } };

      const priorityCell = row.getCell(8);
      if (priority === 'urgent')
        priorityCell.font = { color: { argb: colors.danger } };
      else if (priority === 'high')
        priorityCell.font = { color: { argb: colors.textOrange } };
      else if (priority === 'medium')
        priorityCell.font = { color: { argb: colors.yellow } };
      else if (priority === 'low')
        priorityCell.font = { color: { argb: colors.green } };
    });

    const timestamp = new Date().getTime();
    const finalFileName = fileName || `EHS_correctiveActions_${timestamp}.xlsx`;

    const buffer = await workbook.xlsx.writeBuffer();
    const base64Data = Buffer.from(buffer).toString('base64');

    if (Platform.OS === 'ios') {
      const filePath = `${RNFS.DocumentDirectoryPath}/${finalFileName}`;
      await RNFS.writeFile(filePath, base64Data, 'base64');
      try {
        const shareResult = await Share.share({
          url: `file://${filePath}`,
          title: 'EHS correctiveActions Report',
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
          path: filePath,
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

    console.error('Export correctiveActions to XLSX error:', error);
    return {
      success: false,
      message: `Failed to export correctiveActions: ${error.message}`,
      error,
    };
  }
};
