import * as http from 'http';
import * as url from 'url';
import { readFile, writeFile, access } from 'fs/promises';

const buy = document.getElementById("buy-option");
const sell = document.getElementById("sell-option");
const listlabel = document.getElementById("input-label");
const title = document.getElementById("input-title");
const subtitle = document.getElementById("input-subtitle");
const isbn = document.getElementById("input-isbn");
const author = document.getElementById("input-author");
const edition = document.getElementById("input-edition");
const trade = document.getElementById("btn-to-trade");
const lsell = document.getElementById("btn-to-sell");
const sellamount = document.getElementById("input-sell-amt");
const imageUpload = document.getElementById("image-upload");

const button = document.getElementsId("btn-add-listing");
const JSONfile = "textbook.json";

let library = {};

async function load() {
    try {
        const data = await readFile(JSONfile, { encoding: 'utf8' });
        library = JSON.parse(data);
    } catch (err) {
        library = {};
    }
}


async function update() {
    try {
        const data = await JSON.stringify(library);
        await writeFile(JSONfile, data, {encoding: 'utf8' });
    } catch (err) {
        console.log(err);
    }
}

export async function storeBook(response) {
    await load();
    let book = {};
    book["option"] = buy.value == ""? sell.value: buy.value;
    book["listlabel"] = listlabel.value; 
    book["title"] = title.value;
    book["subtitle"] = subtitle.value;
    book["author"] = author.value;
    book["edition"] = edition.value;
    book["transaction"] = trade.value == ""? sellamount.value: trade.value;
    // sets varaible to an int if trade is empty else return string
    library[isbn.value] = book;
    update();
    response.writeHead(200, { 'Content-Type': 'application/json'});
    response.write(JSON.stringify(library));
    response.end();  
    
}

export async function getBook(response, value) {
    await load();
    if (value in library) {
        response.writeHead(200, { 'Content-Type': 'application/json'});
        response.write(JSON.stringify(library[value]));
        response.end();  
    } else {
        response.writeHead(404, { 'Content-Type': 'application/json'});
        response.write(JSON.stringify({error: "Book not found"}));
        response.end();  
    }
}

export async function deleteBook(response, value) {
    await load();
    if (value in library) {
        delete library[value];
        update();
        response.writeHead(200, { 'Content-Type': 'application/json'});
        response.write(JSON.stringify(library));
        response.end();  
    } else {
        response.writeHead(404, { 'Content-Type': 'application/json'});
        response.write(JSON.stringify({error: "Book not found"}));
        response.end();  
    }
}


async function basicServer(request, response) {
    // TODO: Implement the server
    const parsedURL = url.parse(request.url, true);
    const options = parsedURL.query;
    const pathname = parsedURL.pathname;
    const method = request.method;
    if (method == 'POST' && pathname.startsWith('/storeBook')) {
        storeBook(response)
    } else if (method == 'GET' && pathname.startsWith('/getBook')) {
        getBook(response, options.book);
    } else if (method == 'DELETE' && pathname.startsWith('/deleteBook')) {
        deleteBook(response, options.book);
    }
   
  }

  http.createServer(basicServer).listen(3000, () => {
    console.log('Server started on port 3000');
  });
  

