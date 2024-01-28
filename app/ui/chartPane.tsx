import { XrdDataSet } from "app/models/xrdDataSet"
import MultiLineChart from "./multiLineChart"
import ChartOptions from "./chartOptions";
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
