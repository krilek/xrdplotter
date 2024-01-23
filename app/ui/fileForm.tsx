
'use client';
import { fileParser } from 'app/actions/parseFiles';
import { useFormState, useFormStatus } from 'react-dom';
import XlsxDownloadButton from './xlsxDownloadButton';
import FileInput from './fileInput';
import { XrdDataSet } from 'app/models/xrdDataSet';
import { XlsxFile, xlsxGenerator } from 'app/actions/xlsxGenerator';
type Props = {
    parseFiles?: (files: File[]) => Promise<XrdDataSet[]>
    onDataSetsReady: (dataSets: XrdDataSet[]) => void
    // generateXlsx: (dataSets: XrdDataSet[]) => XlsxFile
}

export default function FileForm({ parseFiles = fileParser, onDataSetsReady }: Props) {
    // const [state, formAction] = useFormState(parseFilesAction, initialState)

    return (
        <form>
            <FileInput label="Provide .xy files:" onFilesSelected={async (files: File[]) => {
                const dataSets = await parseFiles(files);
                onDataSetsReady(dataSets);
            }} />
        </form>
    )
}
