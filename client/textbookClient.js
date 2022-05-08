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
const deleteisbn = document.getElementById("delete-input-isbn");

const addbutton = document.getElementById("btn-add-listing");
const deletebutton = document.getElementById("btn-delete-listing");
addbutton.addEventListener('click', addingBook);
deletebutton.addEventListener('click', deletingBook);

async function addingBook() {
    console.log("adding book");
    let book = {};
    book["isbn"] = isbn.value;
    book["option"] = buy.value === "on"? "buy": "sell";
    book["listlabel"] = listlabel.value; 
    book["title"] = title.value;
    book["subtitle"] = subtitle.value;
    book["author"] = author.value;
    book["edition"] = edition.value;
    book["transaction"] = trade.value === "on"? "trade" : "money";
    await fetch('/createBook', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book),
    });
}


async function deletingBook() {
    let book = {};
    book["isbn"] = deleteisbn.value;
    console.log("deleting book")
    let modal = bootstrap.Modal.getInstance(document.getElementById("deleteTextbookModal"),{});
    document.querySelectorAll('.modal-backdrop').forEach(backdrop =>{backdrop.remove();});
    modal.hide();
    await fetch('/deleteBook', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book),
    });
}


// need to change isbn.value
async function gettingBook() {
    const res = await fetch ('/getBook', {
        method: 'POST',
        body: JSON.stringify({isbn: isbn.value})
    })
    return res.json();
}







