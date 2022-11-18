import express from 'express';
import File from '../../utilities/fileSystem';

interface howToQuery {
    filename?: string;
    width?: string;
    height?: string;
}

/**
 * Validation
 */
const queryValidate = async (queryV: howToQuery): Promise<null | string> => {
    if (!(await File.isImageThere(queryV.filename))) {
        const existantImageName: string = (
            await File.imageName()
        ).join(', ');
        return `You've entered a wrong filename. choose one from: ${existantImageName}`;
    }

    if (!queryV.width && !queryV.height) {
        return null;
    }
    const width: number = parseInt(queryV.width || '');
    if (Number.isNaN(width) || width < 1) {
        return 'enter a correct width number';
    }
    const height: number = parseInt(queryV.height || '');
    if (Number.isNaN(height) || height < 1) {
        return 'enter a correct height number';
    }
    return null;
};

const photos: express.Router = express.Router();

photos.get('/', async(request: express.Request, response: express.Response): Promise<void> => {
    const validateMsg: null | string = await queryValidate(request.query);
    if (validateMsg) {
        response.send(validateMsg);
        return;
    }
    let error: null | string = '';

    //if there is no thumb create one
    if (!(await File.isThumbThere(request.query))) {
        error = await File.crtThumb(request.query);
    }

    // Handle image processing error
    if (error) {
        response.send(error);
        return;
    }

    //Show the image
    const showImage: null | string = await File.findImagePath(request.query);
    if (showImage) {
        response.sendFile(showImage);
    } else {
        response.send('something whent wrong');
    }
});
export default photos;