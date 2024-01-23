import { XrdDataSet } from "app/models/xrdDataSet"
import MultiLineChart, { ChartLabel, ChartPoint, LabelOptions, LineColor } from "./multiLineChart"
import { FormEvent, useEffect, useMemo, useState } from "react";
import DatasetColorPickers from "./datasetColorPickers";
import { randomColor } from "app/actions/randomColor";
import SliderInput from "./sliderInput";
import { lab, line } from "d3";

type Props = {
    dataSets: XrdDataSet[]
    colorsGenerator?: () => string
}
export default function ChartPane({ dataSets, colorsGenerator = randomColor }: Props) {
    const [offset, setOffset] = useState(20);
    const [height, setHeight] = useState(500);
    const [width, setWidth] = useState(1000);
    const [padding, setPadding] = useState(50);
    const [colors, setColors] = useState<LineColor[]>([]);
    const chartData = useMemo<ChartPoint[]>(() => {
        return dataSets.flatMap((dataSet, index) => {
            return dataSet.points.map((point) => ({
                x: point.twoTheta,
                y: point.intensity + (index * offset),
                label: dataSet.name
            }));
        });
    }, [dataSets, offset]);
    const labelOptions = useMemo<LabelOptions[]>(() => (
        dataSets.map((x, index) => ({
            x: width - padding,
            y: (height - padding) - ((index + 1) * offset),
            label: x.name
        }))
    ), [dataSets, offset, width, height, padding]);
    useEffect(() => {
        setColors(dataSets.map(x => {
            const exists = colors.find(c => c.label == x.name);
            if (!exists) {
                return {
                    label: x.name,
                    color: colorsGenerator()
                };
            }
            return exists;
        }));
    }, [dataSets])
    if (dataSets.length === 0) {
        return <></>
    }
    return (
        <div>
            <div>
                <div>
                    <SliderInput label="Offset:" value={offset} min={1} max={100} onValueChanged={(value) => setOffset(value)} debounceMs={200} />
                </div>
                <div>
                    <SliderInput label="Width:" value={width} min={400} max={4000} onValueChanged={(value) => setWidth(value)} />
                </div>
                <div>
                    <SliderInput label="Height:" value={height} min={200} max={2000} onValueChanged={(value) => setHeight(value)} />
                </div>
                <div>
                    <SliderInput label="Padding:" value={padding} min={5} max={300} onValueChanged={(value) => setPadding(value)} />
                </div>
                <DatasetColorPickers colors={colors} onColorUpdate={(lineColor) => {
                    setColors(colors.map(x => {
                        if (x.label === lineColor.label) {
                            return lineColor;
                        }
                        return x;
                    }));
                }} />
            </div>
            <MultiLineChart
                data={chartData}
                labels={labelOptions}
                colors={colors}
                height={height}
                lineOffset={offset}
                padding={padding}
                width={width}
            />
        </div>
    )
}
