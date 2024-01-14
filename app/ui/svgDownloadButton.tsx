type Props = {
    fileName: string
    b64Data?: string
}

export default function SvgDownloadButton({ fileName, b64Data }: Props): JSX.Element | null {
    if (!b64Data) {
        return null;
    }
    return (
        <a download={`${fileName}.svg`} href={`data:image/svg+xml;base64,${b64Data}`}>Download {fileName}</a>
    )
}
