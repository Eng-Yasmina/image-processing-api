import sharp from "sharp";

interface sharpParameters {
    source: string;
    target: string;
    width: number;
    height: number;
}

/**
 * using sharp to resize image
 */
const resizeImage = async (parameters: sharpParameters): Promise<null | string> => {
    try {
        await sharp(parameters.source).resize(parameters.width, parameters.height).toFormat('jpeg').toFile(parameters.target);
        return null;
    } catch {
        return 'something went wrong :)';
    }
};

export default resizeImage;
