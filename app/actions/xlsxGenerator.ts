import { XrdDataSet } from 'app/models/xrdDataSet';
import { SheetBuilder } from 'app/services/sheetBuilder';
import * as XLSX from 'xlsx';

export interface XlsxFile {
    base64Data: string
    fileName: string
}

export const xlsxGenerator = (dataSets: XrdDataSet[]): XlsxFile => {
    const fileType = "xlsx";
    const builder = new SheetBuilder();
    dataSets.forEach(dataSet => builder.addDataSet(dataSet));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, builder.getSheet(), "Results");
    return {
        base64Data: XLSX.write(workbook, { type: "base64", bookType: fileType }),
        fileName: xlsxFileNameGenerator(dataSets, fileType)
    };
}

const xlsxFileNameGenerator = (dataSets: XrdDataSet[], fileType: string): string => {
    return `${dataSets.map(x => x.name).join("_")}.${fileType}`;
}