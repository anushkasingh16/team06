import express from 'express';
import logger from 'morgan';
import path from 'path';
import expressSession from 'express-session';
import {fileURLToPath} from 'url';
import { MessengerDatabase } from './messengercrud.js'
import { ProfileDatabase } from './profilecrud.js';
import { TextbookDatabase } from './textbookcrud.js';
import 'dotenv/config';
import { dirname } from 'path';
import auth from './auth.js';
import users from './users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const sessionConfig = {
    secret: process.env.SECRET || 'SECRET',
    resave: false,
    saveUninitialized: false
};
app.use(expressSession(sessionConfig));

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', express.static('client'));

auth.configure(app);

function checkLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
}
app.get('/', checkLoggedIn, (req,res) => {
    res.redirect('/home');
});
app.post('/login', auth.authenticate('local',{
    successRedirect: '/home',
    failureRedirect: '/'
    })
);
app.post('/register', (req,res) =>{
    const{ username, password} = req.body;
    if(users.addUser(username,password)){
        res.redirect('/home');
    }else{
        res.redirect('/');
    }
});

const profdb = new ProfileDatabase(process.env.DATABASE_URL);
await profdb.connect();

const mdb = new MessengerDatabase(process.env.DATABASE_URL);
await mdb.connect();

const textbookdb = new TextbookDatabase(process.env.DATABASE_URL);
await textbookdb.connect();

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
    try {
        await mdb.createMessage(response, request.body);
      } catch (err) {
        console.log(err);
        response.status(500).send(err);
    }
});

app.post('/messenger/read', async (request, response) => {
    try {
        await mdb.readMessages(response, request.body);
      } catch (err) {
        console.log(err);
        response.status(500).send(err);
    }
});

app.get('/', async (request, response) => {
    response.sendFile(path.join(__dirname,'..', 'client', 'index.html'));
});

app.post('/existingUser', async (request, response) => {
    try {
        await profdb.userExists(response, request.body);
      } catch (err) {
        console.log(err);
        response.status(500).send(err);
    }
});

app.post('/getUser', async (request, response) => {
    try {
        await profdb.readProfile(response, request.body);
      } catch (err) {
        console.log(err);
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

app.post('/createBook', async (request, response) => {
    try {
        console.log(request.body, "index");
        await textbookdb.createBook(response, request.body);
      } catch (err) {
        response.status(500).send(err);
    }
});

app.post('/getBook', async (request, response) => {
    try {
        const res = await textbookdb.getBook(response, request.body);
      } catch (err) {
        response.status(500).send(err);
    }
});

app.get('/getAllBooks', async (request, response) => {
    try {
        const res = await textbookdb.getAllBooks(response, request);
      } catch (err) {
        response.status(500).send(err);
    }
});

app.post('/deleteBook', async (request, response) => {
    try {
        const res = await textbookdb.deleteBook(response, request.body);
      } catch (err) {
        response.status(500).send(err);
    }
});

app.get('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
