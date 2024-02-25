import { Font } from "app/models/fontsEnum"
import { LabelOptions } from "app/models/options/labelOptions"
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
    xLabelOptions: LabelOptions
    yLabelOptions: LabelOptions
    setLabel: SetLabelDefinition
    setFont: SetFontDefinition
    setLabelSize: SetLabelSizeDefinition
}

export type SetLabelDefinition = (value: string, labelOptions: LabelOptions) => void;
export type SetLabelSizeDefinition = (value: number, labelOptions: LabelOptions) => void;
export type SetFontDefinition = (value: Font, labelOptions: LabelOptions) => void;

export const ChartOptionsContext = createContext<ChartOptionsContextType>({} as ChartOptionsContextType);
type Props = {
    children: ReactNode
}

export default function ChartOptionsContextProvider({ children }: Props) {
    const [offset, setOffset] = useState(20);
    const [height, setHeight] = useState(500);
    const [width, setWidth] = useState(1000);
    const [padding, setPadding] = useState(50);
    const [xLabelOptions, setXLabelOptions] = useState<LabelOptions>({
        content: '2θ',
        font: Font.Arial,
        pos: {
            x: 300,
            y: 200,
        },
        size: 12
    });
    const [yLabelOptions, setYLabelOptions] = useState<LabelOptions>(
        {
            content: 'Intensity',
            font: Font.Arial,
            pos: {
                x: 300,
                y: 200,
            },
            size: 12
        }
    );
    const contextData = useMemo<ChartOptionsContextType>(() => {

        const setLabelSize = (value: number, labelOptions: LabelOptions) => {
            const updateFunc = labelOptions == xLabelOptions ? setXLabelOptions : setYLabelOptions;
            updateFunc({
                content: labelOptions.content,
                font: labelOptions.font,
                pos: labelOptions.pos,
                size: value
            });
        }
        const setLabel = (value: string, labelOptions: LabelOptions) => {
            const updateFunc = labelOptions == xLabelOptions ? setXLabelOptions : setYLabelOptions;
            updateFunc({
                content: value,
                font: labelOptions.font,
                pos: labelOptions.pos,
                size: labelOptions.size
            });
        }
        const setFont = (value: Font, labelOptions: LabelOptions) => {
            const updateFunc = labelOptions == xLabelOptions ? setXLabelOptions : setYLabelOptions;
            updateFunc({
                content: labelOptions.content,
                font: value,
                pos: labelOptions.pos,
                size: labelOptions.size
            });
        }
        return {
            height,
            width,
            padding,
            offset,
            setHeight,
            setWidth,
            setPadding,
            setOffset,
            setFont,
            setLabel,
            setLabelSize,
            xLabelOptions,
            yLabelOptions
        };
    }, [height,
        width,
        padding,
        offset,
        setHeight,
        setWidth,
        setPadding,
        setOffset,
        xLabelOptions,
        yLabelOptions]);
    return (
        <ChartOptionsContext.Provider value={contextData}>
            {children}
        </ChartOptionsContext.Provider>
    )
}