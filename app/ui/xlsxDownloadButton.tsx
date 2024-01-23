import { XlsxFile, xlsxGenerator } from "app/actions/xlsxGenerator";
import { XrdDataSet } from "app/models/xrdDataSet";
import { useEffect, useState } from "react";

type Props = {
    dataSets: XrdDataSet[]
    generator?: (dataSet: XrdDataSet[]) => XlsxFile | null
}

export default function XlsxDownloadButton({ dataSets, generator = xlsxGenerator }: Props): JSX.Element | null {
    const [xlsxFile, setXlsxFile] = useState<XlsxFile | null>();

    useEffect(() => {
        const generatedXlsxFile = generator(dataSets);
        setXlsxFile(generatedXlsxFile);
    }, [dataSets, generator]);

    if (!xlsxFile) {
        return null;
    }
    return (
        <a download={xlsxFile?.fileName} href={`data:application/vnd.ms-excel;base64,${xlsxFile.base64Data}`}>Download {xlsxFile.fileName}</a>
    );
}
