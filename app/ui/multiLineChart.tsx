'use client'
import * as d3 from "d3";
import { FormEvent, useEffect, useRef, useState } from "react";
import SvgDownloadButton from "./svgDownloadButton";
import { XrdDataSet } from 'app/models/xrdDataSet';
import DatasetColorPickers from "./datasetColorPickers";

export type ChartLabel = string;
export interface LabelOptions {
    x: number,
    y: number,
    label: ChartLabel
}
export interface ChartPoint {
    x: number
    y: number
    label: ChartLabel
}

export interface LineColor {
    color: string
    label: ChartLabel
}

type Props = {
    data: ChartPoint[]
    colors: LineColor[]
    labels: LabelOptions[]
    width: number
    height: number
    lineOffset: number
    padding: number
}

export default function MultiLineChart({ data, labels, colors, width, height, lineOffset, padding }: Props) {
    const svgRef = useRef(null);
    useEffect(() => {
        const svg = d3
            .select(svgRef.current)
            .classed("line-chart", true)
            .attr("width", width)
            .attr("height", height);
        svg.selectAll("*").remove()

        const x = d3.scaleLinear([d3.min(data, d => d.x) as number, d3.max(data, d => d.x) as number], [padding, width - padding])
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

        const y = d3.scaleLinear([d3.min(data, d => d.y) as number, d3.max(data, d => d.y) as number], [height - padding, padding]);
        svg.append("g")
            // .attr("transform", `translate(0, 0)`)
            .call(g => g.append("text")
                .attr("font-size", "2em")
                .attr("transform", `rotate(-90) translate(-${height / 2}, ${padding / 2})`)
                .attr("text-anchor", "middle")
                .text("Intensity"));
        // .call(d3.axisLeft(y));

        const dataNest = Array.from(
            d3.group(data, d => d.label), ([key, value]) => ({ key, value })
        );
        const line = d3.line()
            .x(d => x(d[0]))
            .y(d => y(d[1]));
        labels.forEach((labelOption) => {
            svg.append("text")
                // .attr("transform", `translate(${width - padding},${(height - padding) - ((index + 1) * lineOffset)})`)
                .attr("transform", `translate(${labelOption.x},${labelOption.y})`)
                .attr("dy", ".35em")
                .attr("text-anchor", "end")
                .style("fill", "steelblue")
                .text(labelOption.label);
        });

        svg.selectAll("path.line")
            .data(dataNest)
            .join("path")
            .attr("class", "line")
            .attr("fill", "none")
            .style("stroke", d => colors.find(x => x.label == d.key)?.color ?? 'red')
            .attr("d", d => line(d.value.map(x => [x.x, x.y])));
    }, [colors, lineOffset, width, height, padding, data, svgRef.current]); // redraw chart if data changes

    return (
        <div>
            <svg ref={svgRef} />
            {/* <img src={imgData} /> */}
            {/* <SvgDownloadButton b64Data={b64Data} fileName="chuj" /> */}
        </div>
    );
};