"use client"
import ColorPicker from "./colorPicker"
import { DataSetOptions, SetColorDefinition, SetFontDefinition, SetLabelDefinition, SetLabelSizeDefinition, SetStrokeWidthDefinition } from "./contexts/chartDataSetOptionsContextProvider"
import { useCallback, useState } from "react"
import FontPicker from "./fontPicker"
import LabelInput from "./labelInput"
import { Font } from "app/models/fontsEnum"
import SliderInput from "./sliderInput"
import LabelOptions from "./labelOptions"

type Props = {
    options: DataSetOptions
    onColorSet: SetColorDefinition
    onLabelSet: SetLabelDefinition
    onFontSet: SetFontDefinition
    onLabelSizeSet: SetLabelSizeDefinition
    onStrokeWidthSet: SetStrokeWidthDefinition
}
export default function DatasetOptions({ options, onColorSet, onLabelSet, onFontSet, onLabelSizeSet, onStrokeWidthSet }: Props) {
    return (
        <div>
            <p>{`Settings of: ${options.dataSetNameReference}`}</p>
            <LabelOptions
                label={options.label}
                onLabelSet={(newLabel: string) => onLabelSet(newLabel, options.dataSetNameReference)}
                onFontSet={(newFont: Font) => onFontSet(newFont, options.dataSetNameReference)}
                onLabelSizeSet={(newLabelSize: number) => onLabelSizeSet(newLabelSize, options.dataSetNameReference)}
            />
            <ColorPicker
                color={options.color}
                label="Color:"
                onColorUpdate={(newColor: string) => onColorSet(newColor, options.dataSetNameReference)}
            />
            <SliderInput
                label="Stroke width:"
                value={options.strokeWidth}
                min={0.01}
                step={0.01}
                max={10}
                onValueChanged={(newStrokeWidth: number) => onStrokeWidthSet(newStrokeWidth, options.dataSetNameReference)} />

        </div>
    )
}
