type Props = {
    fileName: string
    b64Data?: string
}

export default function XlsxDownloadButton({ fileName, b64Data }: Props): JSX.Element | null {
    if (!b64Data) {
        return null;
    }
    return (
        <a download={`${fileName}.xlsx`} href={`data:application/vnd.ms-excel;base64,${b64Data}`}>Download {fileName}</a>
    )
}
