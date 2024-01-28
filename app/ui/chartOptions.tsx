import { useContext } from "react";
import SliderInput from "./sliderInput";
import { ChartOptionsContext } from "./contexts/chartOptionsContextProvider";

export default function ChartOptions() {
    const { height,
        width,
        padding,
        offset,
        setHeight,
        setWidth,
        setPadding,
        setOffset } = useContext(ChartOptionsContext);
    return (
        <div>
            <div>
                <SliderInput label="Offset:" value={offset} min={1} max={100} onValueChanged={setOffset} debounceMs={200} />
            </div>
            <div>
                <SliderInput label="Width:" value={width} min={400} max={4000} onValueChanged={setWidth} />
            </div>
            <div>
                <SliderInput label="Height:" value={height} min={200} max={2000} onValueChanged={setHeight} />
            </div>
            <div>
                <SliderInput label="Padding:" value={padding} min={5} max={300} onValueChanged={setPadding} />
            </div>
        </div>
    );
}