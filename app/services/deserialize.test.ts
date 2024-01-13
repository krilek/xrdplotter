import { parse, parseAll } from "./deserialize";
import { Point } from "../models/point";

describe("parse", () => {
    it.each([{
        input: "10 10",
        expected: {
            twoTheta: 10,
            intensity: 10
        } as Point
    },
    {
        input: "10.2 10.3", expected: {
            twoTheta: 10.2,
            intensity: 10.3
        } as Point
    },
    {
        input: "10,2 10,3", expected: {
            twoTheta: 10.2,
            intensity: 10.3
        } as Point
    },
    {
        input: "-10.2 -10.3", expected: {
            twoTheta: -10.2,
            intensity: -10.3
        } as Point
    },
    {
        input: "10.2 -10.3", expected: {
            twoTheta: 10.2,
            intensity: -10.3
        } as Point
    },
    {
        input: "-10.2 10.3", expected: {
            twoTheta: -10.2,
            intensity: 10.3
        } as Point
    }])("should parse point when input is %s", ({ input, expected }) => {
        expect(parse(input)).toEqual(expected)
    })
})


describe("parseAll", () => {
    it.each([{
        input: "10 10\n-10 20",
        expected: [{
            twoTheta: 10,
            intensity: 10
        },
        {
            twoTheta: -10,
            intensity: 20
        }] as Point[]
    }, {
        input: "10 10\r\n-10 20",
        expected: [{
            twoTheta: 10,
            intensity: 10
        },
        {
            twoTheta: -10,
            intensity: 20
        }] as Point[]
    }])("should parse point when input is %s", ({ input, expected }) => {
        expect(parseAll(input)).toEqual(expected)
    })
})
