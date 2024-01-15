'use client'
import * as d3 from "d3";
import { FormEvent, useEffect, useRef, useState } from "react";
import SvgDownloadButton from "./svgDownloadButton";
import { XrdDataSet } from 'app/models/xrdDataSet';
import DatasetColorPickers from "./datasetColorPickers";

type Props = {
    dataSets: XrdDataSet[]
}

export default function MultiLineChart({ dataSets }: Props) {
    const svgRef = useRef(null);
    const [imgData, setImgData] = useState("");
    const [b64Data, setB64Data] = useState("");
    const [offset, setOffset] = useState(20);
    const [height, setHeight] = useState(500);
    const [width, setWidth] = useState(1000);
    const [padding, setPadding] = useState(50);
    const [colors, setColors] = useState<{ label: string, color: string }[]>([]);
    useEffect(() => {
        setColors(dataSets.map(x => {
            const exists = colors.find(c => c.label == x.name);
            if (!exists) {
                return {
                    label: x.name,
                    color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
                };
            }
            return exists;
        }));
    }, [dataSets])
    useEffect(() => {
        // D3 Code
        const dataset = dataSets[0];
        if (!dataset) {
            return;
        }
        let data1 = dataSets.flatMap((x, index) => x.points.map(y => ({
            symbol: x.name,
            x1: y.twoTheta,
            y1: y.intensity + (index * offset)
        })));

        // SELECTIONS

        const svg = d3
            .select(svgRef.current)
            .classed("line-chart", true)
            .attr("width", width)
            .attr("height", height);
        svg.selectAll("*").remove()

        const x = d3.scaleLinear([d3.min(data1, d => d.x1) as number, d3.max(data1, d => d.x1) as number], [padding, width - padding])
        svg.append("g")
            .attr("transform", `translate(0, ${height - padding})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
            .call(g => g.append("text")
                .attr("x", width / 2)
                .attr("y", padding)
                .attr("font-size", "2em")
                .attr("fill", "currentColor")
                .attr("text-anchor", "middle")
                .text("TwoTheta"));

        const y = d3.scaleLinear([d3.min(data1, d => d.y1) as number, d3.max(data1, d => d.y1) as number], [height - padding, padding]);
        svg.append("g")
            // .attr("transform", `translate(0, 0)`)
            .call(g => g.append("text")
                .attr("font-size", "2em")
                .attr("transform", `rotate(-90) translate(-${height / 2}, ${padding / 2})`)
                .attr("text-anchor", "middle")
                .text("Intensity"));
        // .call(d3.axisLeft(y));

        const dataNest = Array.from(
            d3.group(data1, d => d.symbol), ([key, value]) => ({ key, value })
        );
        const line = d3.line()
            .x(d => x(d[0]))
            .y(d => y(d[1]));
        dataSets.forEach((x, index) => {
            svg.append("text")
                .attr("transform", `translate(${width - padding},${(height - padding) - ((index + 1) * offset)})`)
                .attr("dy", ".35em")
                .attr("text-anchor", "end")
                .style("fill", "steelblue")
                .text(x.name);
        })

        svg.selectAll("path.line")
            .data(dataNest)
            .join("path")
            .attr("class", "line")
            .attr("fill", "none")
            .style("stroke", d => colors.find(x => x.label == d.key)?.color ?? 'red')
            .attr("d", d => line(d.value.map(x => [x.x1, x.y1])));
    }, [colors, offset, width, height, padding, dataSets, svgRef.current]); // redraw chart if data changes

    return (
        <div>
            <div>
                <div>
                    <label>
                        Offset:
                        <input defaultValue={offset} type="range" min="1" max="100" onInput={(e: FormEvent<HTMLInputElement>) => setOffset(Number((e.target as HTMLInputElement)?.value))} />
                    </label>
                </div>
                <div>
                    <label>
                        Width:
                        <input defaultValue={width} type="range" min="400" max="4000" onInput={(e: FormEvent<HTMLInputElement>) => setWidth(Number((e.target as HTMLInputElement)?.value))} />
                    </label>
                </div>
                <div>
                    <label>
                        Height:
                        <input defaultValue={height} type="range" min="200" max="2000" onInput={(e: FormEvent<HTMLInputElement>) => setHeight(Number((e.target as HTMLInputElement)?.value))} />
                    </label>

                </div>
                <div>
                    <label>
                        Padding:
                        <input defaultValue={padding} type="range" min="5" max="300" onInput={(e: FormEvent<HTMLInputElement>) => setPadding(Number((e.target as HTMLInputElement)?.value))} />
                    </label>
                </div>
                <DatasetColorPickers colors={colors} onColorUpdate={(dataSetName, color) => {
                    setColors(colors.map(x => {
                        if (x.label === dataSetName) {
                            return { label: dataSetName, color: color }
                        }
                        return x;
                    }));
                }} />
            </div>
            <svg ref={svgRef} />
            {/* <img src={imgData} /> */}
            {/* <SvgDownloadButton b64Data={b64Data} fileName="chuj" /> */}
        </div>
    );
};