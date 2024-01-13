
'use client'
import { FormState, parseFilesAction } from 'app/actions/parseFilesAction';
import { useFormState, useFormStatus } from 'react-dom';
import XlsxDownloadButton from './xlsxDownloadButton';
const initialState = {
    xlsx: ''
} as FormState

export default function FileForm() {
    const [state, formAction] = useFormState(parseFilesAction, initialState)

    return (
        <form action={formAction}>
            <input type="file" name='files' multiple />
            <button type="submit">Send Request</button>

            <XlsxDownloadButton fileName={Date.now().toString()} b64Data={state.xlsx} />
        </form>
    )
}
