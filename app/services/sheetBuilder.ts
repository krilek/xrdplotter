import { XrdDataSet } from "app/models/xrdDataSet";
import * as XLSX from 'xlsx';

export class SheetBuilder {
    sheet: XLSX.WorkSheet;
    currentColumn: number
    datasetWidth: number
    spacing: number;
    topOffset: number;
    datasetHeaderWidth: number;
    datasetHeaderHeight: number;
    constructor() {
        this.sheet = XLSX.utils.aoa_to_sheet([]);
        this.currentColumn = 0;
        this.topOffset = 1;
        if (this.topOffset <= 0) {
            throw new Error("Invalid top offset of the dataset in sheet");
        }
        this.datasetWidth = 2;
        this.spacing = 1;
        this.datasetHeaderHeight = 1;
        this.datasetHeaderWidth = 2;
    }

    addDataSet(dataSet: XrdDataSet) {
        const headerRange = prepareHeaderRange(
            this.currentColumn,
            this.topOffset - 1,
            this.datasetHeaderWidth,
            this.datasetHeaderHeight
        );
        const headerContent = dataSet.name;
        XLSX.utils.sheet_add_aoa(this.sheet, [[headerContent]], {
            origin: {
                c: this.currentColumn,
                r: this.topOffset - 1
            }
        });
        this.sheet["!merges"]?.push(headerRange);
        XLSX.utils.sheet_add_json(this.sheet, dataSet.points, {
            origin: {
                c: this.currentColumn,
                r: this.topOffset
            }
        });
        this.increaseCurrentColumn();
    }

    getSheet(): XLSX.WorkSheet {
        return this.sheet;
    }

    increaseCurrentColumn() {
        this.currentColumn += this.datasetWidth + this.spacing;
    }
}

function prepareHeaderRange(x: number, y: number, width: number, height: number): XLSX.Range {
    return {
        s: { c: x, r: y },
        e: { c: x + width, r: y + height }
    };
}