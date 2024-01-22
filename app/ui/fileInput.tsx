import { XrdDataSet } from "app/models/xrdDataSet"
import { ChangeEvent, useEffect, useMemo, useState } from "react"

type Props = {
    label: string
    onFilesSelected: (files: File[]) => void
}

export default function FileInput({ label, onFilesSelected }: Props) {
    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files)
            onFilesSelected(Array.from(e.target.files));
    };
    return (
        <div>
            <label>
                {label}
                <input type="file" accept='.xy' onChange={onChange} multiple />
            </label>
        </div>
    )
}
