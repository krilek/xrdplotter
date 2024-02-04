"use client"
import ColorPicker from "./colorPicker"
import { DataSetOptions, SetColorDefinition, SetFontDefinition, SetLabelDefinition, SetLabelSizeDefinition, SetStrokeWidthDefinition } from "./contexts/chartDataSetOptionsContextProvider"
import { useCallback, useState } from "react"
import FontPicker from "./fontPicker"
import LabelInput from "./labelInput"
import { Font } from "app/models/fontsEnum"
import SliderInput from "./sliderInput"

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
            <LabelInput
                value={options.label.content}
                label="Label:"
                onLabelUpdate={(newLabel: string) => onLabelSet(newLabel, options.dataSetNameReference)}
            />
            <FontPicker
                font={options.label.font}
                label="Label font:"
                onFontUpdate={(newFont: Font) => onFontSet(newFont, options.dataSetNameReference)}
            />
            <SliderInput
                label="Label size:"
                value={options.label.size}
                min={1}
                step={1}
                max={50}
                onValueChanged={(newLabelSize: number) => onLabelSizeSet(newLabelSize, options.dataSetNameReference)} />
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
