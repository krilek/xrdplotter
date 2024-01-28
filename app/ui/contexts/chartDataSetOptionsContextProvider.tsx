import { randomColor } from "app/actions/randomColor";
import { Font } from "app/models/fontsEnum";
import { DataSetName, XrdDataSet } from "app/models/xrdDataSet"
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

export type ChartLabel = string;

export interface LabelOptions {
    font: Font;
    xPos: number,
    yPos: number,
    content: ChartLabel
}

export interface DataSetOptions {
    color: string
    label: LabelOptions
    dataSetNameReference: DataSetName
}
export type SetColorDefinition = (value: string, dataSetNameReference: DataSetName) => void;
export type SetLabelDefinition = (value: string, dataSetNameReference: DataSetName) => void;
export type SetFontDefinition = (value: Font, dataSetNameReference: DataSetName) => void;
type ChartDataSetOptionsContextType = {
    optionsGroups: DataSetOptions[]
    setColor: SetColorDefinition
    setFont: SetFontDefinition
    setLabel: SetLabelDefinition
}

export const ChartDataSetOptionsContext = createContext<ChartDataSetOptionsContextType>({} as ChartDataSetOptionsContextType);
type Props = {
    dataSets: XrdDataSet[]
    children: ReactNode
}

const generateEmptyOptionsFromDataSet = (dataSet: XrdDataSet): DataSetOptions => {
    return {
        color: randomColor(),
        dataSetNameReference: dataSet.name,
        label: {
            content: dataSet.name,
            xPos: 300,
            yPos: 200,
            font: Font.Arial
        }
    };
}

export default function ChartDataSetOptionsContextProvider({ dataSets, children }: Props) {
    const [optionsGroups, setOptionsGroups] = useState<DataSetOptions[]>([]);
    useEffect(() => {
        const newOptionsGroups = dataSets.map(dataSet => {
            const exists = optionsGroups.find(options => options.dataSetNameReference == dataSet.name);
            if (!exists) {
                return generateEmptyOptionsFromDataSet(dataSet);
            }
            return exists;
        });
        setOptionsGroups(newOptionsGroups);
    }, [dataSets]);

    const contextData = useMemo<ChartDataSetOptionsContextType>(() => {

        const setColor = (value: string, dataSetNameReference: DataSetName) => {
            const newOptionsGroups = optionsGroups.map<DataSetOptions>(optionsGroup => {
                if (optionsGroup.dataSetNameReference !== dataSetNameReference) {
                    return optionsGroup;
                }

                if (optionsGroup.color === value) {
                    return optionsGroup;
                }
                return {
                    color: value,
                    dataSetNameReference: optionsGroup.dataSetNameReference,
                    label: optionsGroup.label
                };
            });
            setOptionsGroups(newOptionsGroups);
        };



        const setLabel = (value: string, dataSetNameReference: DataSetName) => {
            const newOptionsGroups = optionsGroups.map<DataSetOptions>(optionsGroup => {
                if (optionsGroup.dataSetNameReference !== dataSetNameReference) {
                    return optionsGroup;
                }

                if (optionsGroup.label.content === value) {
                    return optionsGroup;
                }
                return {
                    color: optionsGroup.color,
                    dataSetNameReference: optionsGroup.dataSetNameReference,
                    label: {
                        content: value,
                        font: optionsGroup.label.font,
                        xPos: optionsGroup.label.xPos,
                        yPos: optionsGroup.label.yPos
                    }
                };
            });
            setOptionsGroups(newOptionsGroups);
        };

        const setFont = (value: Font, dataSetNameReference: DataSetName) => {
            const newOptionsGroups = optionsGroups.map<DataSetOptions>(optionsGroup => {
                if (optionsGroup.dataSetNameReference !== dataSetNameReference) {
                    return optionsGroup;
                }
                if (optionsGroup.label.font === value) {
                    return optionsGroup;
                }
                return {
                    color: optionsGroup.color,
                    dataSetNameReference: optionsGroup.dataSetNameReference,
                    label: {
                        content: optionsGroup.label.content,
                        font: value,
                        xPos: optionsGroup.label.xPos,
                        yPos: optionsGroup.label.yPos
                    }
                };
            });
            setOptionsGroups(newOptionsGroups);
        };
        return {
            optionsGroups,
            setColor,
            setFont,
            setLabel
        };
    }, [optionsGroups]);
    return (
        <ChartDataSetOptionsContext.Provider value={contextData}>
            {children}
        </ChartDataSetOptionsContext.Provider>
    )
}