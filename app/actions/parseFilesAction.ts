'use server'
import { XrdDataSet } from 'app/models/xrdDataSet';
import { parseAll } from 'app/services/deserialize';
import { SheetBuilder } from 'app/services/sheetBuilder';
import * as XLSX from 'xlsx';

export type FormState = {
    xlsx: string
    json: XrdDataSet[]
}

export async function parseFilesAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const files = formData.getAll('files') as File[];
    if (!files || (files.length == 1 && files[0].size == 0)) {
        return {
            xlsx: ''
        };
    }
    const contents = await Promise.all(files.map(async x => {
        return {
            fileName: x.name.replace(/\.[^/.]+$/, ""),
            content: await x.text()
        }
    }));
    const datasets = contents.map(x => ({
        name: x.fileName,
        points: parseAll(x.content)
    } as XrdDataSet));
    const builder = new SheetBuilder();
    datasets.forEach(dataSet => builder.addDataSet(dataSet));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, builder.getSheet(), "Results");
    return {
        json: datasets,
        xlsx: XLSX.write(workbook, { type: "base64", bookType: "xlsx" })
    }
}