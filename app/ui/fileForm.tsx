
import { FormState, parseFiles } from 'app/actions/parseFiles';
import { useFormState, useFormStatus } from 'react-dom';
import XlsxDownloadButton from './xlsxDownloadButton';
import LineChart from './lineChart';
import MultiLineChart from './multiLineChart';
import FileInput from './fileInput';
import { XrdDataSet } from 'app/models/xrdDataSet';
import { XlsxFile, xlsxGenerator } from 'app/actions/xlsxGenerator';
type Props = {
    parseFiles: (files: File[]) => Promise<XrdDataSet[]>
    generateXlsx: (XrdDataSet[]) => XlsxFile
}

export default function FileForm() {
    // const [state, formAction] = useFormState(parseFilesAction, initialState)

    return (
        <form>
            <FileInput label="Provide .xy files:" onFilesSelected={(files: File[]) => { }} />
            {/* <button type="submit">Send Request</button> */}
            {/* <XlsxDownloadButton fileName={Date.now().toString()} b64Data={state.xlsx} /> */}
            {/* <LineChart dataSets={state.json} /> */}
            {/* <MultiLineChart dataSets={state.json} /> */}
        </form>
    )
}
