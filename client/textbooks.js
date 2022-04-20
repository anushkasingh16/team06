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

const JSONfile = "textbooks.json";

let library = {};


btnAdd.addEventListener("click", addNewTextbook);
buyOption.addEventListener("click", setFormBuy);
sellOption.addEventListener("click", setFormSell);
toTrade.addEventListener("click", ()=>{toggleButton(toTrade);});
toSell.addEventListener("click", ()=>{toggleButton(toSell);});

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


// Why is this here? This shouldnt be in the client code. Im commenting it out for now till I figure out who/why this is here. ~ Tyler
/*


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
  

*/