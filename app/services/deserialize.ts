import { Point } from "../models/point";
import DeserializeError from "../errors/deserializeError";

export function parse(row: string, splitter: RegExp = /\s+/i): Point {
    const parts = row.replace(/,/g, '.').split(splitter);
    if (parts.length > 2) {
        throw new DeserializeError("Received too many values to split");
    }
    const x = Number(parts[0]);
    const y = Number(parts[1]);
    if (Number.isNaN(x)) {
        throw new DeserializeError("Failed to parse x")
    }
    if (Number.isNaN(y)) {
        throw new DeserializeError("Failed to parse y")
    }
    return {
        twoTheta: x,
        intensity: y
    }
}

export function parseAll(csvContent: string): Point[] {
    return csvContent.split(/\r?\n/i).filter(x => x).map((row, index) => {
        try {
            return parse(row)
        } catch (error) {
            if (error instanceof DeserializeError) {
                throw new DeserializeError(`Failed parsing row: ${index}`, error);
            }
            throw error;
        }
    });
}