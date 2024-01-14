'use client'
import * as d3 from "d3";
import { FormEvent, useEffect, useRef, useState } from "react";
import SvgDownloadButton from "./svgDownloadButton";
import { XrdDataSet } from 'app/models/xrdDataSet';

type Props = {
    dataSets: XrdDataSet[]
}

export default function MultiLineChart({ dataSets }: Props) {
    const svgRef = useRef(null);
    const [imgData, setImgData] = useState("");
    const [b64Data, setB64Data] = useState("");
    const [offset, setOffset] = useState(5);
    useEffect(() => {
        // D3 Code
        const dataset = dataSets[0];
        if (!dataset) {
            return;
        }
        let data1 = dataSets.flatMap((x, index) => x.points.map(y => ({
            symbol: x.name == 'Er-Bi2O2CO3_zolty_bg_subtracted' ? 'a' : 'c',
            x1: y.twoTheta,
            y1: y.intensity + (index * offset)
        })));
        const width = 1000,
            height = 500;

        // SELECTIONS

        const svg = d3
            .select(svgRef.current)
            .classed("line-chart", true)
            .attr("width", width)
            .attr("height", height);
        svg.selectAll("*").remove()

        const x = d3.scaleLinear([d3.min(data1, d => d.x1) as number, d3.max(data1, d => d.x1) as number], [30, width - 30])
        svg.append("g")
            .attr("transform", `translate(0, ${height - 30})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

        const y = d3.scaleLinear([d3.min(data1, d => d.y1) as number, d3.max(data1, d => d.y1) as number], [height - 30, 0]);

        svg.append("g")
            .attr("transform", `translate(30, 0)`)
            .call(d3.axisLeft(y));

        const dataNest = Array.from(
            d3.group(data1, d => d.symbol), ([key, value]) => ({ key, value })
        );
        const line = d3.line()
            .x(d => x(d[0]))
            .y(d => y(d[1]));
        svg.selectAll("path.line")
            .data(dataNest)
            .join("path")
            .attr("class", "line")
            .attr("fill", "none")
            .style("stroke", d => d.key === 'a' ? 'blue' : 'red')
            .attr("d", d => line(d.value.map(x => [x.x1, x.y1])));
    }, [offset, dataSets, svgRef.current]); // redraw chart if data changes

    return (
        <>
            <svg ref={svgRef} />
            <input type="range" min="5" max="300" onInput={(e: FormEvent<HTMLInputElement>) => setOffset(Number((e.target as HTMLInputElement)?.value))} />
            {/* <img src={imgData} /> */}
            {/* <SvgDownloadButton b64Data={b64Data} fileName="chuj" /> */}
        </>
    );
};