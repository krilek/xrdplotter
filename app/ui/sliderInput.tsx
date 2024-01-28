import { useDebouncedCallback } from "use-debounce";

type Props = {
    label: string
    onValueChanged: (value: number) => void
    min: number
    max: number
    value: number
    debounceMs?: number
}

export default function SliderInput({ label, min, max, value, onValueChanged, debounceMs = 100 }: Props) {
    const debounced = useDebouncedCallback(onValueChanged, debounceMs);
    return (
        <label>
            {label}
            <input defaultValue={value} type="range" min={min} max={max} onChange={e => debounced(Number(e.target.value))} />
        </label>
    )
}
