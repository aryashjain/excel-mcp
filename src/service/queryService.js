import ExcelJS from 'exceljs';
import fs from 'fs';
import Papa from 'papaparse';

export async function loadExcel(filePath, sheetName) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const sheet = sheetName ? workbook.getWorksheet(sheetName) : workbook.worksheets[0];
    if (!sheet) throw new Error(`Sheet '${sheetName}' not found`);

    const rows = [];
    let headers = [];

    sheet.eachRow({ includeEmpty: false }, (row, rowIndex) => {
        const values = row.values.slice(1); // Remove index 0 empty element
        if (rowIndex === 1) {
            headers = values;
        } else {
            const obj = {};
            headers.forEach((header, i) => {
                obj[header] = values[i];
            });
            rows.push(obj);
        }
    });

    return rows;
}

export async function loadCSV(filePath) {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const parsed = Papa.parse(fileData, { header: true });
    return parsed.data; 
}
