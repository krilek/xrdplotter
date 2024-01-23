import ColorPicker from "./colorPicker"
import { LineColor } from "./multiLineChart"

type Props = {
    colors: LineColor[]
    onColorUpdate: (color: LineColor) => void
}
export default function DatasetColorPickers({ colors, onColorUpdate }: Props) {
    return (
        <div>
            {colors.map(x => (
                <ColorPicker key={x.label} color={x.color} label={x.label} onColorUpdate={newColor => onColorUpdate({ label: x.label, color: newColor })} />
            ))}
        </div>
    )
}
