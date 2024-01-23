'use client';
import { ChangeEvent, useEffect, useMemo, useState } from "react"

type Props = {
    label: string
    onFilesSelected: (files: File[]) => void
}

export default function FileInput({ label, onFilesSelected }: Props) {
    const inputHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files)
            onFilesSelected(Array.from(e.target.files));
    };

    return (
        <label>
            {label}
            <input type="file" accept='.xy' onChange={inputHandler} multiple />
        </label>
    )
}
