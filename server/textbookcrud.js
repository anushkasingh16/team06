import { readFile, writeFile } from 'fs/promises';

let library = [];

let JSONfile = 'textbook.json';

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

export async function storeBook(request, response) {
    await load();
    library.push(request.body);
    update();
    response.writeHead(200, { 'Content-Type': 'application/json'});
    response.write(JSON.stringify(library));
    response.end();  
}

export async function getBook(request, response) {
    await load();
    if (request.body in library) {
        response.writeHead(200, { 'Content-Type': 'application/json'});
        response.write(JSON.stringify(library));
        response.end();  
    } else {
        response.writeHead(404, { 'Content-Type': 'application/json'});
        response.write(JSON.stringify({error: "Book not found"}));
        response.end();  
    }
}

export async function deleteBook(request, response) {
    await load();
    if (request.body in library) {
        delete library[request.body["name"]];
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






