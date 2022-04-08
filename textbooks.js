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
        const response = await readFile(JSONfile, { encoding: 'utf8' });
        library = await response.json();
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

export function storeBook(e) {
    load();
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
}

export function getBook(value) {
    load();
    return value in library? library[value]: null;
}

export function deleteBook(value) {
    load();
    delete library[value];
    update();
}


button.addEventlistener("click", storeBook());

