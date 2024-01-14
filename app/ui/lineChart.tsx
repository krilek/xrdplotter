'use client'
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import SvgDownloadButton from "./svgDownloadButton";
import { XrdDataSet } from 'app/models/xrdDataSet';

// export default function LineChart() {

//     const ref = useRef()

//     // Create the SVG container.
//     const svg = d3.select(ref.current)
//         .attr("width", width)
//         .attr("height", height)
//         .attr("viewBox", [0, 0, width, height])
//         .attr("style", "max-width: 100%; height: auto; height: intrinsic;");


//     return (
//         <svg
//             width={width}
//             height={height}
//             viewBox={"0 0 " + height + " " + width}
//             ref={ref}
//         />
//     )
// }
const loadImage = async (url: string) => {
    const $img = document.createElement('img')
    $img.src = url
    return new Promise((resolve, reject) => {
        $img.onload = () => resolve($img)
        $img.onerror = reject
        $img.src = url
    })
}
type Props = {
    dataSets: XrdDataSet[]
}

export default function LineChart({ dataSets }: Props) {
    const svgRef = useRef(null);
    const [imgData, setImgData] = useState("");
    const [b64Data, setB64Data] = useState("");

    useEffect(() => {
        // D3 Code
        const dataset = dataSets[0];
        if (!dataset) {
            return;
        }
        // Declare the chart dimensions and margins.
        const width = 928;
        const height = 500;
        const marginTop = 20;
        const marginRight = 30;
        const marginBottom = 30;
        const marginLeft = 40;

        // Declare the x (horizontal position) scale.
        // const x = d3.scaleUtc(d3.extent(aapl, d => d.date), [marginLeft, width - marginRight]);
        const x = d3.scaleLinear([d3.min(dataset.points, d => d.twoTheta) as number, d3.max(dataset.points, d => d.twoTheta) as number], [marginLeft, width - marginRight]);
        // Declare the y (vertical position) scale.
        // const y = d3.scaleLinear([0, d3.max(aapl, d => d.close)], [height - marginBottom, marginTop]);
        const y = d3.scaleLinear([d3.min(dataset.points, d => d.intensity) as number, d3.max(dataset.points, d => d.intensity) as number], [height - marginBottom, marginTop]);

        // Declare the line generator.
        const line = d3.line()
            .x(d => x(d[0]))
            .y(d => y(d[1]));
        // Dimensions
        let dimensions = {
            width: 1000,
            height: 500,
            margins: 50,
            containerWidth: 0,
            containerHeight: 0
        };

        dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
        dimensions.containerHeight = dimensions.height - dimensions.margins * 2;

        // SELECTIONS

        const svg = d3
            .select(svgRef.current)
            .classed("line-chart", true)
            .attr("width", dimensions.width)
            .attr("height", dimensions.height);
        svg.selectAll("*").remove()

        // Add the x-axis.
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
            .call(g => g.append("text")
                .attr("x", width / 2)
                .attr("y", 0)
                .attr("font-size", "2em")
                .attr("fill", "currentColor")
                .attr("text-anchor", "middle")
                .text("TwoTheta"));

        // Add the y-axis, remove the domain line, add grid lines and a label.
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            // .call(d3.axisLeft(y).ticks(height / 40))
            // .call(g => g.select(".domain").remove())
            // .call(g => g.selectAll(".tick line").clone()
            //     .attr("x2", width - marginLeft - marginRight)
            //     .attr("stroke-opacity", 0.1))
            .call(g => g.append("text")
                .attr("x", -200)
                .attr("y", 0)
                .attr("transform", "rotate(-90)")
                .attr("font-size", "2em")
                .attr("fill", "currentColor")
                .attr("text-anchor", "middle")
                .text("Intensity"));

        // Append a path for the line.
        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line(dataset.points.map(x => [x.twoTheta, x.intensity])));

        // var serializer = new XMLSerializer();
        // var xmlString = serializer.serializeToString(d3.select(svgRef.current).node());
        // var imgData = btoa(xmlString);
        // setB64Data(imgData);
        // loadImage(`data:image/svg+xml;charset=utf-8;base64,${imgData}`).then(img => {
        //     const $canvas = document.createElement('canvas');
        //     $canvas.getContext('2d').drawImage(img, 0, 0, svg.clientWidth, svg.clientHeight);
        //     const dataURL = $canvas.toDataURL(`image/png`, 1.0);
        //     setImgData(dataURL);
        // }).catch(xd => {
        //     console.log(xd);
        // });
    }, [dataSets, svgRef.current]); // redraw chart if data changes

    return (
        <>
            <svg ref={svgRef} />
            {/* <img src={imgData} /> */}
            {/* <SvgDownloadButton b64Data={b64Data} fileName="chuj" /> */}
        </>
    );
};