import express from 'express';
import logger from 'morgan';
import path from 'path';
import {fileURLToPath} from 'url';
import { readFile, writeFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('client'));

app.get('/home', async (request, response) => {
    response.sendFile("/client/home.html", {root: __dirname });
});

app.get('/mybooks', async (request, response) => {
    response.sendFile("/client/mybooks.html", {root: __dirname });
});

app.get('/profile', async (request, response) => {
    response.sendFile("/client/profile.html", {root: __dirname });
});

app.get('/messenger', async (request, response) => {
    response.sendFile("/client/messenger.html", {root: __dirname });
});

app.get('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
