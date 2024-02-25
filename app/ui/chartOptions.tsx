import { useContext } from "react";
import SliderInput from "./sliderInput";
import { ChartOptionsContext } from "./contexts/chartOptionsContextProvider";
import LabelOptions from "./labelOptions";

export default function ChartOptions() {
    const { height,
        width,
        padding,
        offset,
        setHeight,
        setWidth,
        setPadding,
        xLabelOptions,
        yLabelOptions,
        setLabel,
        setFont,
        setLabelSize,
        setOffset } = useContext(ChartOptionsContext);
    return (
        <div>
            <p>{`x label options`}</p>
            <LabelOptions
                label={xLabelOptions}
                onLabelSet={(newLabel) => { setLabel(newLabel, xLabelOptions); }}
                onLabelSizeSet={(size) => { setLabelSize(size, xLabelOptions); }}
                onFontSet={(font) => { setFont(font, xLabelOptions); }}
            />
            <p>{`y label options`}</p>
            <LabelOptions
                label={yLabelOptions}
                onLabelSet={(newLabel) => { setLabel(newLabel, yLabelOptions); }}
                onLabelSizeSet={(size) => { setLabelSize(size, yLabelOptions); }}
                onFontSet={(font) => { setFont(font, yLabelOptions); }}
            />
            <div>
                <SliderInput label="Offset:" value={offset} min={1} step={1} max={100} onValueChanged={setOffset} debounceMs={200} />
            </div>
            <div>
                <SliderInput label="Width:" value={width} min={400} step={1} max={4000} onValueChanged={setWidth} />
            </div>
            <div>
                <SliderInput label="Height:" value={height} min={200} step={1} max={2000} onValueChanged={setHeight} />
            </div>
            <div>
                <SliderInput label="Padding:" value={padding} min={5} step={1} max={300} onValueChanged={setPadding} />
            </div>
        </div>
    );
}