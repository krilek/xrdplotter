import { Font } from "app/models/fontsEnum";

type Props = {
    label: string
    font: Font,
    onFontUpdate: (font: Font) => void
}

export default function FontPicker({ label, font, onFontUpdate }: Props) {
    return (
        <div>
            <label>
                {label}
                <select value={font} style={{ fontFamily: Font[font] }} onChange={(e) => {
                    const newFont = e.target.value as unknown as Font;
                    onFontUpdate(newFont);
                }}>
                    {Object.values(Font).map((x, index) => (
                        <option value={x} key={index} style={{ fontFamily: x.toString() }}>{x}</option>
                    ))}
                </select>
            </label>
        </div>
    )
}
