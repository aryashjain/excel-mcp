// import ExcelJS from "exceljs";

// export async function loadExcel(filePath, sheetName) {
//     const workbook = new ExcelJS.Workbook();
//     await workbook.xlsx.readFile(filePath);

//     const sheet = sheetName
//         ? workbook.getWorksheet(sheetName)
//         : workbook.worksheets[0];

//     const data = [];
//     const headers = sheet.getRow(1).values.slice(1);

//     sheet.eachRow((row, rowNumber) => {
//         if (rowNumber === 1) return;
//         const rowData = {};
//         row.values.slice(1).forEach((cell, index) => {
//             rowData[headers[index]] = cell;
//         });
//         data.push(rowData);
//     });

//     return data;
// }
