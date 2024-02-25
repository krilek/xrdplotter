'use client'
import * as d3 from "d3";
import { useContext, useEffect, useRef } from "react";
import { ChartOptionsContext } from "./contexts/chartOptionsContextProvider";
import { ChartDataSetOptionsContext, DataSetOptions } from "./contexts/chartDataSetOptionsContextProvider";
import { ChartPointsContext } from "./contexts/chartPointsContextProvider";
import { Position } from "app/models/position";

export type ChartLabel = string;
type DataGroup = {
    key: string;
    value: ChartPoint[];
    options: DataSetOptions
};
export interface ChartPoint {
    pos: Position
    label: ChartLabel
}

export default function MultiLineChart() {
    const { height,
        width,
        padding,
        offset,
        xLabelOptions,
        yLabelOptions } = useContext(ChartOptionsContext);
    const { points } = useContext(ChartPointsContext);
    const { optionsGroups: options, setLabelPosition } = useContext(ChartDataSetOptionsContext);
    const svgRef = useRef(null);
    useEffect(() => {
        if (options.length === 0) {
            return;
        }
        const svg = d3
            .select(svgRef.current)
            .classed("line-chart", true)
            .attr("width", width)
            .attr("height", height);
        svg.selectAll("*").remove()

        const x = d3.scaleLinear([d3.min(points, d => d.pos.x) as number, d3.max(points, d => d.pos.x) as number], [padding, width - padding])
        svg.append("g")
            .attr("transform", `translate(0, ${height - padding})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
            .call(g => g.append("text")
                .attr("x", width / 2)
                .attr("y", padding)
                .attr("font-size", "2em")
                .attr("fill", "currentColor")
                .attr("text-anchor", "middle")
                .attr("font-size", xLabelOptions.size)
                .attr("font-family", xLabelOptions.font)
                .text(xLabelOptions.content));

        const y = d3.scaleLinear([d3.min(points, d => d.pos.y) as number, d3.max(points, d => d.pos.y) as number], [height - padding, padding]);
        svg.append("g")
            .call(g => g.append("text")
                .attr("font-size", "2em")
                .attr("transform", `rotate(-90) translate(-${height / 2}, ${padding / 2})`)
                .attr("text-anchor", "middle")
                .attr("font-size", yLabelOptions.size)
                .attr("font-family", yLabelOptions.font)
                .text(yLabelOptions.content));

        const dataNest = Array.from(
            d3.group(points, d => d.label), ([key, value]) => ({ key, value, options: options.find(x => x.dataSetNameReference == key) } as DataGroup)
        );
        const line = d3.line()
            .x(d => x(d[0]))
            .y(d => y(d[1]));
        const dragHandler = d3.drag<any, DataGroup>()
            .on("drag", function (event, d) {

                d3.select(this)
                    .attr("x", event.x)
                    .attr("y", event.y);
                setLabelPosition({
                    x: event.x,
                    y: event.y
                }, d.key);
            });
        svg.selectAll("text.label")
            .data(dataNest)
            .join('text')
            .attr('class', 'label draggable')
            .attr("font-family", d => d.options.label.font)
            .attr("x", d => d.options.label.pos.x)
            .attr("y", d => d.options.label.pos.y)
            .attr("font-size", d => d.options.label.size)
            .text(d => d.options.label.content)
            .call(dragHandler);

        svg.selectAll("path.line")
            .data(dataNest)
            .join("path")
            .attr("class", "line")
            .attr("fill", "none")
            .style("stroke", d => options.find(x => x.dataSetNameReference == d.key)?.color ?? 'red')
            .attr("stroke-width", d => options.find(x => x.dataSetNameReference == d.key)?.strokeWidth ?? 1)
            .attr("d", d => line(d.value.map(x => [x.pos.x, x.pos.y])));
    }, [options, offset, width, height, padding, points, xLabelOptions, yLabelOptions, svgRef.current]); // redraw chart if data changes

    return (
        <div>
            <svg ref={svgRef} />
        </div>
    );
};