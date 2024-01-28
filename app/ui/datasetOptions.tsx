"use client"
import ColorPicker from "./colorPicker"
import { DataSetOptions, SetColorDefinition, SetFontDefinition, SetLabelDefinition } from "./contexts/chartDataSetOptionsContextProvider"
import { useCallback, useState } from "react"
import FontPicker from "./fontPicker"
import LabelInput from "./labelInput"
import { Font } from "app/models/fontsEnum"

type Props = {
    options: DataSetOptions
    onColorSet: SetColorDefinition
    onLabelSet: SetLabelDefinition
    onFontSet: SetFontDefinition
}
export default function DatasetOptions({ options, onColorSet, onLabelSet, onFontSet }: Props) {
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
            <ColorPicker
                color={options.color}
                label="Color:"
                onColorUpdate={(newColor: string) => onColorSet(newColor, options.dataSetNameReference)}
            />
        </div>
    )
}
