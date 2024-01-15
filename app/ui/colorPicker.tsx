import { XrdDataSet } from "app/models/xrdDataSet"
import { useEffect, useMemo, useState } from "react"

type Props = {
    label: string
    color: string,
    onColorUpdate: (color: string) => void
}
export default function ColorPicker({ label, color, onColorUpdate }: Props) {
    const [inputValue, setInputValue] = useState("");
    useEffect(() => {
        setInputValue(color);
    }, [color]);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onColorUpdate(inputValue);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [inputValue, 500]);

    return (
        <div>
            <label>
                {`Color of ${label}:`}
                <input type="color" id={label} name={label} value={inputValue} onChange={e => setInputValue(e.target.value)} />
            </label>
        </div>
    )
}
