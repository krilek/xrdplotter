
'use client';
import { XrdDataSet } from 'app/models/xrdDataSet';
import FileForm from './fileForm';
import ChartPane from './chartPane';
import XlsxDownloadButton from './xlsxDownloadButton';
import { useState } from 'react';
import ChartOptionsContextProvider from './contexts/chartOptionsContextProvider';
import ChartDataSetOptionsContextProvider from './contexts/chartDataSetOptionsContextProvider';
type Props = {
    parseFiles?: (files: File[]) => Promise<XrdDataSet[]>
    onDataSetsReady: (dataSets: XrdDataSet[]) => void
    // generateXlsx: (dataSets: XrdDataSet[]) => XlsxFile
}

export default function MainPane() {
    const [dataSets, setDataSets] = useState<XrdDataSet[]>([]);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <FileForm onDataSetsReady={(readDataSets) => {
                setDataSets(readDataSets);
            }} />
            <XlsxDownloadButton dataSets={dataSets} />
            <ChartOptionsContextProvider>
                <ChartDataSetOptionsContextProvider dataSets={dataSets}>
                    <ChartPane dataSets={dataSets} />
                </ChartDataSetOptionsContextProvider>
            </ChartOptionsContextProvider>
        </main>
    )
}
