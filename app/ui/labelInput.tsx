import { useDebouncedCallback } from "use-debounce";

type Props = {
    label: string
    value: string,
    onLabelUpdate: (label: string) => void
}

export default function LabelInput({ label, value, onLabelUpdate }: Props) {
    const debounced = useDebouncedCallback(onLabelUpdate, 500);
    return (
        <div>
            <label>
                {label}
                <input type="text" defaultValue={value} onChange={e => debounced(e.target.value)} />
            </label>
        </div>
    )
}
