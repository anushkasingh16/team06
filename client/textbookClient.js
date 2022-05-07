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


const addbutton = document.getElementById("btn-add-listing");
const deletebutton = document.getElementById("btn-delete-listing");


async function addingBook() {
    console.log("adding book");
    let book = {};
    book["isbn"] = isbn.value;
    book["option"] = buy.value == ""? sell.value: buy.value;
    book["listlabel"] = listlabel.value; 
    book["title"] = title.value;
    book["subtitle"] = subtitle.value;
    book["author"] = author.value;
    book["edition"] = edition.value;
    book["transaction"] = trade.value == ""? sellamount.value: trade.value;
    await fetch('/createBook', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
        },
        body: book,
    });
}

async function deletingBook() {
    let book = {};
    book["isbn"] = isbn.value;
    console.log("deleting book")
    let modal = bootstrap.Modal.getInstance(document.getElementById("deleteTextbookModal"),{});
    document.querySelectorAll('.modal-backdrop').forEach(backdrop =>{backdrop.remove();});
    modal.hide();
    await fetch('/deleteBook', {
        method: 'DELETE',
        body: book,
    });
}

async function gettingBook() {
    const res = await fetch ('/getBook', {
        method: 'POST',
        body: {isbn: isbn.value}
    })
    return res.json();
}

addbutton.addEventListener('click', addingBook);
deletebutton.addEventListener('click', deletingBook);



//need to work on this

