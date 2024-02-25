import { Font } from "app/models/fontsEnum";
import { Position } from "app/models/position";
import { ChartLabel } from "app/models/chartLabel";
export interface LabelOptions {
    font: Font;
    pos: Position
    content: ChartLabel
    size: number
}