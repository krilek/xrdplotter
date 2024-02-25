"use client"
import ColorPicker from "./colorPicker"
import { useCallback, useState } from "react"
import FontPicker from "./fontPicker"
import LabelInput from "./labelInput"
import { Font } from "app/models/fontsEnum"
import SliderInput from "./sliderInput"
import { LabelOptions } from "app/models/options/labelOptions"

type Props = {
    label: LabelOptions
    onLabelSet: (label: string) => void
    onFontSet: (font: Font) => void
    onLabelSizeSet: (value: number) => void
}
export default function LabelOptions({ label, onLabelSet, onFontSet, onLabelSizeSet }: Props) {
    return (
        <div>
            <LabelInput
                value={label.content}
                label="Label:"
                onLabelUpdate={onLabelSet}
            />
            <FontPicker
                font={label.font}
                label="Label font:"
                onFontUpdate={onFontSet}
            />
            <SliderInput
                label="Label size:"
                value={label.size}
                min={1}
                step={1}
                max={50}
                onValueChanged={onLabelSizeSet} />
        </div>
    )
}
