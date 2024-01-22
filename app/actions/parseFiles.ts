import { XrdDataSet } from 'app/models/xrdDataSet';
import { parseAll } from 'app/services/deserialize';

export async function parseFiles(files: File[]): Promise<XrdDataSet[]> {
    if (!files || (files.length == 1 && files[0].size == 0)) {
        return [];
    }

    const contents = await Promise.all(files.map(async x => {
        return {
            fileName: x.name.replace(/\.[^/.]+$/, ""),
            content: await x.text()
        }
    }));
    return contents.map(x => ({
        name: x.fileName,
        points: parseAll(x.content)
    } as XrdDataSet));
}