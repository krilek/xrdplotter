import { XrdDataSet } from "app/models/xrdDataSet"
import MultiLineChart, { ChartLabel, ChartPoint, LabelOptions, LineColor } from "./multiLineChart"
import { FormEvent, useContext, useEffect, useMemo, useState } from "react";
import DatasetColorPickers from "./datasetOptions";
import { randomColor } from "app/actions/randomColor";
import SliderInput from "./sliderInput";
import { lab, line } from "d3";
import ChartOptions from "./chartOptions";
import ChartOptionsContextProvider, { ChartOptionsContext } from "./contexts/chartOptionsContextProvider";
import DataSetOptionsGroup from "./dataSetOptionsGroup";
import ChartPointsContextProvider from "./contexts/chartPointsContextProvider";

type Props = {
    dataSets: XrdDataSet[]
}
export default function ChartPane({ dataSets }: Props) {
    if (dataSets.length === 0) {
        return <></>
    }
    return (
        <>
            <ChartOptions />
            <DataSetOptionsGroup />
            <ChartPointsContextProvider dataSets={dataSets}>
                <MultiLineChart />
            </ChartPointsContextProvider>
        </>
    )
}
