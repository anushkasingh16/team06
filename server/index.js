import express from 'express';
import logger from 'morgan';
import path from 'path';
import {fileURLToPath} from 'url';
import { MessengerDatabase } from './messengercrud.js'
import { ProfileDatabase } from './profilecrud.js';
import { storeBook, getBook, deleteBook } from './textbookcrud.js';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('client'));

const profdb = new ProfileDatabase(process.env.DATABASE_URL);
await profdb.connect();

const mdb = new MessengerDatabase(process.env.DATABASE_URL);
await mdb.connect();

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
app.get('/', async (request, response) => {
    response.sendFile(path.join(__dirname,'..', 'client', 'index.html'));
});
app.get('/messenger/read', async (request, response) => {
    response.sendFile("./client/messenger.html", {root: __dirname });
    readMessages(request, response);
});

app.post('/existingUser', async (request, response) => {
    try {
        await profdb.userExists(response, request.body);
      } catch (err) {
        response.status(500).send(err);
    }
});

app.post('/getUser', async (request, response) => {
    try {
        await profdb.readProfile(response, request.body);
      } catch (err) {
        response.status(500).send(err);
    }
    
});

app.post('/registerNewUser', async (request, response) => {
    try {
        await profdb.createProfile(response, request.body);
    } catch (err) {
        console.log(err);
        response.status(500).send(err);
    }
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
