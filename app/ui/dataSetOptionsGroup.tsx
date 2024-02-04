import { useContext } from "react";
import { ChartDataSetOptionsContext } from "./contexts/chartDataSetOptionsContextProvider";
import DatasetOptions from "./datasetOptions";

export default function DataSetOptionsGroup() {
    const { optionsGroups, setColor, setLabel, setFont, setLabelSize, setStrokeWidth } = useContext(ChartDataSetOptionsContext);
    return (
        <div>
            {
                optionsGroups.map(options => (
                    <DatasetOptions
                        key={options.dataSetNameReference}
                        options={options}
                        onColorSet={setColor}
                        onFontSet={setFont}
                        onLabelSizeSet={setLabelSize}
                        onLabelSet={setLabel}
                        onStrokeWidthSet={setStrokeWidth}
                    />
                ))
            }
        </div>
    );
}