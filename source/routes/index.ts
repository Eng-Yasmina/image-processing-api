import express from 'express';
import { request } from 'http';
import photos from './api/photos';

const routes: express.Router = express.Router();

routes.use('/api/photos', photos);
routes.get('/', (request: express.Request, response: express.Response): void => {
    response.send(`<h2 style="color: blue; text-align: center"> API for resizing photos </h2>
    <h3 style="color: red; text-align: center"> if you don't know how to start.. just enter the following queries: <ul style="color: blue; text-align: center;"><li><a style="text-decoration: none" href="/api/photos?filename=yasmine">/api/photos?filename=yasmine</a></li>
    <li><a style="text-decoration: none" href="/api/photos?filename=yasmine&width=200&height=200">/api/photos?filename=yasmine&width=200&height=200</a></li></ul>`);
});

export default routes;