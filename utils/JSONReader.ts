import fs from 'fs';

export class JSONReader {

    async readJSONFile(filePath: string) {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
}







