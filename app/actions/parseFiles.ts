import { XrdDataSet } from 'app/models/xrdDataSet';
import { parsePoints } from 'app/services/deserialize';
import { sort } from 'd3';

export const fileParser = async (files: File[]): Promise<XrdDataSet[]> => {
    if (!files || (files.length == 1 && files[0].size == 0)) {
        return [];
    }

    const contents = await Promise.all(files.map(async x => {
        return {
            fileName: x.name.replace(/\.[^/.]+$/, ""),
            content: await x.text()
        }
    }));
    return contents.map(x => parseDataSet(x.fileName, x.content));
}

const parseDataSet = (name: string, content: string): XrdDataSet => {
    const points = parsePoints(content);
    return {
        name: name,
        points: points
    };
}