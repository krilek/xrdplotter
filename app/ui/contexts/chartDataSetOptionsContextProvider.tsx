import { randomColor } from "app/actions/randomColor";
import { Font } from "app/models/fontsEnum";
import { LabelOptions } from "app/models/options/labelOptions";
import { Position } from "app/models/position";
import { DataSetName, XrdDataSet } from "app/models/xrdDataSet"
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"


export interface DataSetOptions {
    color: string
    label: LabelOptions
    strokeWidth: number
    dataSetNameReference: DataSetName
}
export type SetColorDefinition = (value: string, dataSetNameReference: DataSetName) => void;
export type SetLabelDefinition = (value: string, dataSetNameReference: DataSetName) => void;
export type SetLabelSizeDefinition = (value: number, dataSetNameReference: DataSetName) => void;
export type SetLabelPosDefinition = (value: Position, dataSetNameReference: DataSetName) => void;
export type SetFontDefinition = (value: Font, dataSetNameReference: DataSetName) => void;
export type SetStrokeWidthDefinition = (value: number, dataSetNameReference: DataSetName) => void;

type ChartDataSetOptionsContextType = {
    optionsGroups: DataSetOptions[]
    setColor: SetColorDefinition
    setFont: SetFontDefinition
    setLabel: SetLabelDefinition
    setLabelPosition: SetLabelPosDefinition
    setStrokeWidth: SetStrokeWidthDefinition
    setLabelSize: SetLabelSizeDefinition
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
        strokeWidth: 1,
        label: {
            content: dataSet.name,
            pos: {
                x: 300,
                y: 200,
            },
            size: 12,
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
                    label: optionsGroup.label,
                    strokeWidth: optionsGroup.strokeWidth
                };
            });
            setOptionsGroups(newOptionsGroups);
        };

        const setStrokeWidth = (value: number, dataSetNameReference: DataSetName) => {
            const newOptionsGroups = optionsGroups.map<DataSetOptions>(optionsGroup => {
                if (optionsGroup.dataSetNameReference !== dataSetNameReference) {
                    return optionsGroup;
                }

                if (optionsGroup.strokeWidth === value) {
                    return optionsGroup;
                }

                return {
                    color: optionsGroup.color,
                    dataSetNameReference: optionsGroup.dataSetNameReference,
                    label: optionsGroup.label,
                    strokeWidth: value
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
                    strokeWidth: optionsGroup.strokeWidth,
                    label: {
                        content: value,
                        font: optionsGroup.label.font,
                        size: optionsGroup.label.size,
                        pos: optionsGroup.label.pos
                    }
                };
            });
            setOptionsGroups(newOptionsGroups);
        };

        const setLabelPosition = (value: Position, dataSetNameReference: DataSetName) => {
            const newOptionsGroups = optionsGroups.map<DataSetOptions>(optionsGroup => {
                if (optionsGroup.dataSetNameReference !== dataSetNameReference) {
                    return optionsGroup;
                }

                if (optionsGroup.label.pos.x === value.x && optionsGroup.label.pos.y === value.y) {
                    return optionsGroup;
                }

                return {
                    color: optionsGroup.color,
                    dataSetNameReference: optionsGroup.dataSetNameReference,
                    strokeWidth: optionsGroup.strokeWidth,
                    label: {
                        content: optionsGroup.label.content,
                        font: optionsGroup.label.font,
                        size: optionsGroup.label.size,
                        pos: value
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
                    strokeWidth: optionsGroup.strokeWidth,
                    label: {
                        content: optionsGroup.label.content,
                        font: value,
                        size: optionsGroup.label.size,
                        pos: optionsGroup.label.pos
                    }
                };
            });
            setOptionsGroups(newOptionsGroups);
        };
        const setLabelSize = (value: number, dataSetNameReference: DataSetName) => {
            const newOptionsGroups = optionsGroups.map<DataSetOptions>(optionsGroup => {
                if (optionsGroup.dataSetNameReference !== dataSetNameReference) {
                    return optionsGroup;
                }
                if (optionsGroup.label.size === value) {
                    return optionsGroup;
                }
                return {
                    color: optionsGroup.color,
                    dataSetNameReference: optionsGroup.dataSetNameReference,
                    strokeWidth: optionsGroup.strokeWidth,
                    label: {
                        content: optionsGroup.label.content,
                        font: optionsGroup.label.font,
                        size: value,
                        pos: optionsGroup.label.pos
                    }
                };
            });
            setOptionsGroups(newOptionsGroups);
        };

        return {
            optionsGroups,
            setColor,
            setFont,
            setLabel,
            setLabelSize,
            setLabelPosition,
            setStrokeWidth
        };
    }, [optionsGroups]);
    return (
        <ChartDataSetOptionsContext.Provider value={contextData}>
            {children}
        </ChartDataSetOptionsContext.Provider>
    )
}