import { useEffect, useState } from "react";

export default function useDebounced<T = string>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    function debounceHandler() {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }
    useEffect(debounceHandler, [value, delay]);
    return debouncedValue;
}
