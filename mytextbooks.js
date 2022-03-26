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


const textbook1 = document.getElementById("textbook-card-1");
const textbook2 = document.getElementById("textbook-card-2");
let idCount = 3;

btnAdd.addEventListener("click", addNewTextbook);
buyOption.addEventListener("click", setFormBuy);
sellOption.addEventListener("click", setFormSell);
toTrade.addEventListener("click", ()=>{toggleButton(toTrade);});
toSell.addEventListener("click", ()=>{toggleButton(toSell);});

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

function addNewTextbook() {
    if (form.checkValidity()) {
        let allValid = true;
        if(!(toTrade.classList.contains('active')||toSell.classList.contains('active'))){
            alert("You must select if you want to trade and/or sell your textbook");
            allValid = false;
        }
        if(toSell.classList.contains('active')){
            // TODO Milestone 2: Input Validation for currency
        }
        let modal = bootstrap.Modal.getInstance(document.getElementById("newTextbookModal"),{});
        modal.hide();

        if(document.getElementById("sell-buy-text").innerHTML.includes('Buy')){
            list.innerHTML = list.innerHTML + '<div class="col">' + createTextbookHTML("textbook-card-"+idCount, label.value, title.value, subtitle.value +" | " +edition.value, isbn.value, author.value, "textbook2.jpg", "", toTrade.classList.contains('active'), toSell.classList.contains('active')) + '<\div>';
        }else{
            list.innerHTML = list.innerHTML + '<div class="col">' + createTextbookHTML("textbook-card-"+idCount, label.value, title.value, subtitle.value +" | " +edition.value, isbn.value, author.value, "textbook2.jpg", "Tyler", toTrade.classList.contains('active'), toSell.classList.contains('active')) + '<\div>';
        }
        idCount++;
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