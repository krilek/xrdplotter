'use client'
import * as d3 from "d3";
import { FormEvent, useContext, useEffect, useMemo, useRef, useState } from "react";
import SvgDownloadButton from "./svgDownloadButton";
import { XrdDataSet } from 'app/models/xrdDataSet';
import DatasetColorPickers from "./datasetOptions";
import { ChartOptionsContext } from "./contexts/chartOptionsContextProvider";
import { ChartDataSetOptionsContext } from "./contexts/chartDataSetOptionsContextProvider";
import { ChartPointsContext } from "./contexts/chartPointsContextProvider";

export type ChartLabel = string;

export interface ChartPoint {
    x: number
    y: number
    label: ChartLabel
}

export default function MultiLineChart() {
    const { height,
        width,
        padding,
        offset } = useContext(ChartOptionsContext);
    const { points } = useContext(ChartPointsContext);
    const { optionsGroups: options } = useContext(ChartDataSetOptionsContext);
    const svgRef = useRef(null);
    useEffect(() => {
        const svg = d3
            .select(svgRef.current)
            .classed("line-chart", true)
            .attr("width", width)
            .attr("height", height);
        svg.selectAll("*").remove()

        const x = d3.scaleLinear([d3.min(points, d => d.x) as number, d3.max(points, d => d.x) as number], [padding, width - padding])
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

        const y = d3.scaleLinear([d3.min(points, d => d.y) as number, d3.max(points, d => d.y) as number], [height - padding, padding]);
        svg.append("g")
            // .attr("transform", `translate(0, 0)`)
            .call(g => g.append("text")
                .attr("font-size", "2em")
                .attr("transform", `rotate(-90) translate(-${height / 2}, ${padding / 2})`)
                .attr("text-anchor", "middle")
                .text("Intensity"));
        // .call(d3.axisLeft(y));

        const dataNest = Array.from(
            d3.group(points, d => d.label), ([key, value]) => ({ key, value })
        );
        const line = d3.line()
            .x(d => x(d[0]))
            .y(d => y(d[1]));
        const dragHandler = d3.drag()
            .on("drag", function (event, d) {
                d3.select(this)
                    .attr("x", event.x)
                    .attr("y", event.y);
            });
        options.forEach((option) => {
            svg.append("text")
                .attr("x", option.label.xPos)
                .attr("y", option.label.yPos)
                .attr("class", "draggable")
                .style("fill", "steelblue")
                .attr("font-family", option.label.font)
                .text(option.label.content);
        });

        dragHandler(svg.selectAll(".draggable"));

        svg.selectAll("path.line")
            .data(dataNest)
            .join("path")
            .attr("class", "line")
            .attr("fill", "none")
            .style("stroke", d => options.find(x => x.dataSetNameReference == d.key)?.color ?? 'red')
            .attr("d", d => line(d.value.map(x => [x.x, x.y])));
    }, [options, offset, width, height, padding, points, svgRef.current]); // redraw chart if data changes

    return (
        <div>
            <svg ref={svgRef} />
        </div>
    );
};