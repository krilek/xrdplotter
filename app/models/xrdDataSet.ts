import { Point } from "./point";
export type DataSetName = string;
export interface XrdDataSet {
    points: Point[]
    name: DataSetName
}