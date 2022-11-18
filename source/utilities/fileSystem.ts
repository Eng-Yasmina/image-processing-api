import { promises as fs } from "fs";
import path from "path";
import resizeImage from "./sharpResize";

interface howToQuery {
    filename?: string;
    width?: string;
    height?: string;
}

export default class File {
    static imagePath = path.resolve(__dirname, './../assets/photos/full');
    static thumbPath = path.resolve(__dirname, './../assets/photos/thumb');

/**
 * Specify image path
 */
static async findImagePath(parameters: howToQuery): Promise<null | string> {
    if (!parameters.filename) { 
        return null;
    }

const createFile: string = parameters.width && parameters.height? path.resolve(
    File.thumbPath,`${parameters.filename}-${parameters.width}×${parameters.height}.jpg`): path.resolve(
        File.imagePath, `${parameters.filename}.jpg`);

// Check if file is existant
try {
    await fs.access(createFile);
    return createFile;
} catch {
    return null;
}
}

/**
 * Check if there is an iamge
 */
static async isImageThere(filename: string = ''): Promise<boolean> {
    if (!filename) {
        return false;
    }
    return (await File.imageName()).includes(filename);
}

/**
 * Retrieve image name
 */
static async imageName(): Promise<string[]> {
    try {
        return (await fs.readdir(File.imagePath)).map((filename: string): string => filename.split('.')[0]);
    } catch {
        return [];
    }
}

/**
 * Check if a thumb is already available
 */
static async isThumbThere(parameters: howToQuery): Promise<boolean> {
    if (!parameters.filename || !parameters.width || !parameters.height) {
        return false;
    }

    const fpath: string = path.resolve(
        File.thumbPath, `${parameters.filename}-${parameters.width}×${parameters.height}.jpg`
    );

    try {
        await fs.access(fpath);
        return true;
    } catch {
        return false;
    }
}

/**
 * Create thumb path
 */
static async crtThumbPath(): Promise<void> {
    try {
        await fs.access(File.thumbPath);
    } catch {
        fs.mkdir(File.thumbPath);
    }
}
/**
 * Create thumb file
 */
static async crtThumb(parameters: howToQuery): Promise<null | string> {
    if (!parameters.filename || !parameters.width || !parameters.height) {
        return null;
    }

    const filePath: string = path.resolve(
        File.imagePath, `${parameters.filename}.jpg`
    );
    const fileThumb: string = path.resolve(
        File.thumbPath, `${parameters.filename}-${parameters.width}×${parameters.height}.jpg`
    );

    console.log(`thumb is created ${fileThumb}`);

    return await resizeImage({
        source: filePath,
        target: fileThumb,
        width: parseInt(parameters.width),
        height: parseInt(parameters.height)
    });
}
}

