import express from 'express';
import logger from 'morgan';
import path from 'path';
import {fileURLToPath} from 'url';
import { readFile, writeFile } from 'fs/promises';
import { createMessage, readMessages} from './messengercrud.js'
import { createProfile, updateProfile, readProfile, userExists } from './profilecrud.js';
import { storeBook } from '../textbooks.js';
import { getBook } from '../textbooks.js';
import { deleteBook } from '../textbooks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('client'));
app.use(express.static('client'));

app.get('/home', async (request, response) => {
    response.sendFile(path.join(__dirname,'..', 'client', 'home.html'));
});

app.get('/mybooks', async (request, response) => {
    response.sendFile(path.join(__dirname,'..', 'client', 'mybooks.html'));
});

app.get('/profile', async (request, response) => {
    response.sendFile(path.join(__dirname,'..', 'client', 'profile.html'));
});

app.get('/messenger', async (request, response) => {
    response.sendFile(path.join(__dirname,'..', 'client', 'messenger.html'));
});

app.post('/messenger/create', async (request, response) => {
    response.sendFile(path.join(__dirname,'..', 'client', 'messenger.html'));
    createMessage(request, response);
});

app.get('/messenger/read', async (request, response) => {
    response.sendFile("./client/messenger.html", {root: __dirname });
    readMessages(request, response);
});

app.post('/existingUser', async (request, response) => {
    userExists(response, request.body);
});

app.post('/getUser', async (request, response) => {
    readProfile(response, request.body);
});

app.post('/registerNewUser', async (request, response) => {
    createProfile(response,request.body);
});

app.post('/loginRequest', async (request, response) => {
    //TODO: Login from database
    response.status(404).json(JSON.stringify({ error: `Not Implemented Yet` }));
});

app.post('/storeBook', async (request, response) => {
    storeBook(request, response);
});

app.get('/getBook', async (request, response) => {
    getBook(request, response);
});

app.delete('/deleteBook', async (request, response) => {
    deleteBook(request, response);
});

app.get('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
