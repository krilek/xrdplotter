import { ReactNode, createContext, useMemo, useState } from "react"

type ChartOptionsContextType = {
    offset: number
    setOffset: (value: number) => void
    height: number
    setHeight: (value: number) => void
    width: number
    setWidth: (value: number) => void
    padding: number
    setPadding: (value: number) => void
}

export const ChartOptionsContext = createContext<ChartOptionsContextType>({} as ChartOptionsContextType);
type Props = {
    children: ReactNode
}

export default function ChartOptionsContextProvider({ children }: Props) {
    const [offset, setOffset] = useState(20);
    const [height, setHeight] = useState(500);
    const [width, setWidth] = useState(1000);
    const [padding, setPadding] = useState(50);
    const contextData = useMemo<ChartOptionsContextType>(() => {
        return {
            height,
            width,
            padding,
            offset,
            setHeight,
            setWidth,
            setPadding,
            setOffset
        };
    }, [height,
        width,
        padding,
        offset,
        setHeight,
        setWidth,
        setPadding,
        setOffset]);
    return (
        <ChartOptionsContext.Provider value={contextData}>
            {children}
        </ChartOptionsContext.Provider>
    )
}