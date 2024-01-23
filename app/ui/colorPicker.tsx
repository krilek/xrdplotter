import useDebounced from "app/hooks/useDebounced"
import { XrdDataSet } from "app/models/xrdDataSet"
import { useEffect, useMemo, useState } from "react"

type Props = {
    label: string
    color: string,
    onColorUpdate: (color: string) => void
}
export default function ColorPicker({ label, color, onColorUpdate }: Props) {
    const [inputValue, setInputValue] = useState(color);
    useEffect(() => {
        setInputValue(color);
    }, [color]);
    const inputDebounced = useDebounced(inputValue, 500);
    useEffect(() => {
        onColorUpdate(inputDebounced);
    }, [inputDebounced]);

    return (
        <div>
            <label>
                {`Color of ${label}:`}
                <input type="color" id={label} name={label} value={inputValue} onChange={e => setInputValue(e.target.value)} />
            </label>
        </div>
    )
}
