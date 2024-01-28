import { useDebouncedCallback } from "use-debounce"

type Props = {
    label: string
    color: string,
    onColorUpdate: (color: string) => void
}
export default function ColorPicker({ label, color, onColorUpdate }: Props) {
    const debounced = useDebouncedCallback(onColorUpdate, 500);
    return (
        <div>
            <label>
                {label}
                <input type="color" id={label} name={label} defaultValue={color} onChange={e => debounced(e.target.value)} />
            </label>
        </div>
    )
}
