import useDebounced from "app/hooks/useDebounced";
import { FormEvent, useEffect, useState } from "react";

type Props = {
    label: string
    onValueChanged: (value: number) => void
    min: number
    max: number
    value: number
    debounceMs?: number
}

export default function SliderInput({ label, min, max, value, onValueChanged, debounceMs = 100 }: Props) {
    const [inputValue, setInputValue] = useState(value);
    const inputDebounced = useDebounced(inputValue, debounceMs);
    useEffect(() => {
        onValueChanged(inputDebounced);
    }, [inputDebounced]);
    useEffect(() => {
        setInputValue(value);
    }, [value]);
    return (
        <label>
            {label}
            <input value={inputValue} type="range" min={min} max={max} onInput={(e: FormEvent<HTMLInputElement>) => {
                setInputValue(Number((e.target as HTMLInputElement)?.value));
            }} />
        </label>
    )
}
