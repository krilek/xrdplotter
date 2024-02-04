import { ReactNode, createContext, useContext, useMemo, useState } from "react"
import { ChartPoint } from "../multiLineChart";
import { XrdDataSet } from "app/models/xrdDataSet";
import { ChartOptionsContext } from "./chartOptionsContextProvider";

type ChartPointsContextType = {
    points: ChartPoint[]
}

export const ChartPointsContext = createContext<ChartPointsContextType>({} as ChartPointsContextType);
type Props = {
    dataSets: XrdDataSet[]
    children: ReactNode
}

export default function ChartPointsContextProvider({ dataSets, children }: Props) {
    const { offset } = useContext(ChartOptionsContext);

    const contextData = useMemo<ChartPointsContextType>(() => {
        const points = dataSets.flatMap((dataSet, index) => {
            return dataSet.points.map((point) => ({
                pos: {
                    x: point.twoTheta,
                    y: point.intensity + (index * offset),
                },
                label: dataSet.name
            }));
        });
        return {
            points
        };
    }, [offset, dataSets]);
    return (
        <ChartPointsContext.Provider value={contextData}>
            {children}
        </ChartPointsContext.Provider>
    )
}