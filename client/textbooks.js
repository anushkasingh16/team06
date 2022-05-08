const btnAdd = document.getElementById("btn-add-listing");
const list = document.getElementById("listings-container");
const form = document.getElementById("listing-form");
const buyOption = document.getElementById("buy-option");
const sellOption = document.getElementById("sell-option");
const label = document.getElementById("input-label");
const title = document.getElementById("input-title");
const subtitle = document.getElementById("input-subtitle");
const isbn = document.getElementById("input-isbn");
const author = document.getElementById("input-author");
const edition = document.getElementById("input-edition");
const toTrade = document.getElementById("btn-to-trade");
const toSell = document.getElementById("btn-to-sell");
const sellAmt = document.getElementById("input-sell-amt");
const buy = document.getElementById("buy-option");
const sell = document.getElementById("sell-option");
const listlabel = document.getElementById("input-label");
const trade = document.getElementById("btn-to-trade");
const lsell = document.getElementById("btn-to-sell");
const sellamount = document.getElementById("input-sell-amt");
const imageUpload = document.getElementById("image-upload");
const deleteisbn = document.getElementById("delete-input-isbn");

const addbutton = document.getElementById("btn-add-listing");
const deletebutton = document.getElementById("btn-delete-listing");

deletebutton.addEventListener('click', deletingBook);
btnAdd.addEventListener("click", addNewTextbook);
buyOption.addEventListener("click", setFormBuy);
sellOption.addEventListener("click", setFormSell);
toTrade.addEventListener("click", ()=>{toggleButton(toTrade);});
toSell.addEventListener("click", ()=>{toggleButton(toSell);});
buyOption.addEventListener("click", ()=>{toggleButton(buyOption);});
sellOption.addEventListener("click", ()=>{toggleButton(sellOption);});

function toggleButton(elem){
    if(elem.getAttribute('value') === 'on'){
        elem.setAttribute('value','off');
        elem.classList.remove('active');
    }else{
        elem.setAttribute('value','on');
        elem.classList.add('active');
    }
}

function setFormBuy(){
    document.getElementById("file-input-row").style.display = 'none';
    document.getElementById("sell-amt-group").style.display = 'none';
    document.getElementById("sell-buy-text").innerHTML = 'Looking to Buy';
}

function setFormSell(){
    document.getElementById("file-input-row").style.display = 'flex';
    document.getElementById("sell-amt-group").style.display = 'flex';
    document.getElementById("sell-buy-text").innerHTML = 'Looking to Sell';
}

async function addNewTextbook() {
    console.log("Adding book");
    if (form.checkValidity()) {
        let allValid = true;
        if(!(toTrade.classList.contains('active')||toSell.classList.contains('active'))){
            alert("You must select if you want to trade and/or sell your textbook");
            allValid = false;
            return;
        }
        if(toSell.classList.contains('active')){
            // TODO Input Validation for currency
        }
        let modal = bootstrap.Modal.getInstance(document.getElementById("newTextbookModal"),{});
        document.querySelectorAll('.modal-backdrop').forEach(backdrop =>{backdrop.remove();});
        modal.hide();

        if(document.getElementById("sell-buy-text").innerHTML.includes('Buy')){
            // Add buy listing
        }else{
            // Add sell listing
        }
        addingBook();
        const allBooks = await getAllBooks();
        renderAllTextbooks(allBooks);
        //idCount++;
    }else{
        alert("You must fill out all required fields!");
    }
}

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
    const allBooks = await getAllBooks();
    renderAllTextbooks(allBooks);
}


// need to change isbn.value
async function gettingBook() {
    const res = await fetch ('/getBook', {
        method: 'POST',
        body: JSON.stringify({isbn: isbn.value})
    })
    return res.json();
}

async function getAllBooks(){
    const res = await fetch ('/getAllBooks', {
        method: 'GET'
    })
    return res.json();
}

function renderAllTextbooks(books){
    list.innerHTML = "";
    for (let i = 0; i < books.length; i++){
        const book = books[i];
        if(book['option']==='buy'){
            list.innerHTML = list.innerHTML + '<div class="col">' + createTextbookHTML("textbook-card-"+book['_id'], book['listlabel'], book['title'], book['subtitle'] +" | " +book['edition'], book['_id'], book['author'], "", "", toTrade.classList.contains('active'), toSell.classList.contains('active')) + '<\div>';
        }else{
            list.innerHTML = list.innerHTML + '<div class="col">' + createTextbookHTML("textbook-card-"+book['_id'], book['listlabel'], book['title'], book['subtitle'] +" | " +book['edition'], book['_id'], book['author'], "", "Tyler", toTrade.classList.contains('active'), toSell.classList.contains('active')) + '<\div>';
        }
    }
}


/**
 * Returns a string with HTML to add a bootstrap textbook card to the DOM
 * @param {String} id 
 * @param {String} label 
 * @param {String} title 
 * @param {String} subtitle 
 * @param {String} isbn 
 * @param {String} author 
 * @param {String} image 
 * @param {String} owner if null or empty sets to 'looking to buy'
 * @param {boolean} trade 
 * @param {boolean} sell 
 * @returns 
 */
 function createTextbookHTML(id, label, title, subtitle, isbn, author, image, owner, trade, sell) {
    const textbookCardTemplate = '\
        <div class="card text-center" id="'+ id + '"\>\
        <h3 class="card-header p-2"\>'+ label + '</h3\>\
        <ul class="list-group list-group-flush"\>\
            <li class="list-group-item p-1"\>\
                <h5 class="card-text"\>'+ title + '</h5\>\
                <h6 class="card-text"\>'+ subtitle + '</h6\>\
            </li\>\
            <li class="list-group-item p-1"\>\
                <div class="card-text"\>ISBN: '+ isbn + '</div\>\
            </li\>\
            <li class="list-group-item p-1"\>\
                <div class="card-text"\>Author: '+ author + '</div\>\
            </li\>\
        </ul\>\
        <div class="embed-responsive embed-responsive-1by1"\>\
            <img class="card-img embed-responsive-item textbook-card-img" src="./'+ image + '" alt="Image Not Found"\>\
        </div\>\
        <a href="#" class="stretched-link"\></a\>\
        <div class="card-footer py-0"\>\
            <div class="row justify-content-evenly align-items-center m-1"\>\
                <div class="col"\>\
                    <div class="card-text"\>&owner</div\>\
                </div\>\
                <div class="col-2 m-2 img-container"\>\
                    <h4\>&trade</h4\>\
                </div\>\
                <div class="col-2 m-2 img-container"\>\
                    <h4\>&sell</h4\>\
                </div\>\
            </div\>\
        </div\>\
    ';
    let textbookHTML = textbookCardTemplate;
    if (owner == null || owner.length === 0) {
        textbookHTML = textbookHTML.replace("&owner", "Looking to Buy");
    } else {
        textbookHTML = textbookHTML.replace("&owner", "Owned By: " + owner);
    }
    if (trade) {
        textbookHTML = textbookHTML.replace("&trade", '<i class="bi bi-arrow-left-right"\></i\>');
    } else {
        textbookHTML = textbookHTML.replace("&trade", '');
    }
    if (sell) {
        textbookHTML = textbookHTML.replace("&sell", '<i class="bi bi-currency-dollar"\></i\>');
    } else {
        textbookHTML = textbookHTML.replace("&sell", '');
    }
    return textbookHTML;
}

const allBooks = await getAllBooks();
renderAllTextbooks(allBooks);