import { XrdDataSet } from "app/models/xrdDataSet"
import { useEffect, useMemo, useState } from "react"
import ColorPicker from "./colorPicker"

type Props = {
    colors: { color: string, label: string }[]
    onColorUpdate: (label: string, color: string) => void
}
export default function DatasetColorPickers({ colors, onColorUpdate }: Props) {
    return (
        <div>
            {colors.map(x => (
                <ColorPicker color={x.color} label={x.label} onColorUpdate={newColor => onColorUpdate(x.label, newColor)} />
            ))}
        </div>
    )
}
