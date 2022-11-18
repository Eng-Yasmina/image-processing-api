import { promises as fs } from "fs";
import path from "path";
import File from "../utilities/fileSystem";

describe('I gonna test resizing images', (): void => {
    it('there is an error in width', async (): Promise<void> => {
        const error: null | string = await File.crtThumb({
            filename: 'blabla',
            width: '-400',
            height: '600'
        });
        expect(error).not.toBeNull();
    });

    it('there is an error in filename', async (): Promise<void> => {
        const error: null | string = await File.crtThumb({
            filename: 'blabla',
            width: '400',
            height: '600'
        });
        expect(error).not.toBeNull();
    });

    it('resized thumb written correctelly', async (): Promise<void> => {
        await File.crtThumb({ filename: 'yasmine', width: '88', height: '88' });

        const pathOfResizeImage: string = path.resolve(
            File.thumbPath, `yasmine-88×88.jpg`
        );
        let errorPath: null | string = '';

        try {
            await fs.access(pathOfResizeImage);
            errorPath = null;
        } catch {
            errorPath = 'something wrong happend, we can not find the path';
        }
        expect(errorPath).toBeNull();
    });
})