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



btnAdd.addEventListener("click", addNewTextbook);
buyOption.addEventListener("click", setFormBuy);
sellOption.addEventListener("click", setFormSell);
toTrade.addEventListener("click", ()=>{toggleButton(toTrade);});
toSell.addEventListener("click", ()=>{toggleButton(toSell);});
buyOption.addEventListener("click", ()=>{toggleButton(buyOption);});
sellOption.addEventListener("click", ()=>{toggleButton(sellOption);});

// For some unknown reason my textbook js code didnt make it into the milestone 1 submission despite being on my branch when the code was merged, I have re-added it here.  ~ Tyler
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
    console.log("Adding book");
    if (form.checkValidity()) {
        let allValid = true;
        if(!(toTrade.classList.contains('active')||toSell.classList.contains('active'))){
            alert("You must select if you want to trade and/or sell your textbook");
            allValid = false;
            return;
        }
        if(toSell.classList.contains('active')){
            // TODO Milestone 2: Input Validation for currency
        }
        let modal = bootstrap.Modal.getInstance(document.getElementById("newTextbookModal"),{});
        document.querySelectorAll('.modal-backdrop').forEach(backdrop =>{backdrop.remove();});
        modal.hide();

        if(document.getElementById("sell-buy-text").innerHTML.includes('Buy')){
            // Add buy listing
        }else{
            // Add sell listing
        }
        //idCount++;
    }else{
        alert("You must fill out all required fields!");
    }
}


