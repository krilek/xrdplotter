
import { parseAll } from './services/deserialize';
export const metadata = {
    title: "App Router",
};
import FileForm from './ui/fileForm';
import LineChart from './ui/lineChart';

export default function Page() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <FileForm />
        </main>
    )
}
