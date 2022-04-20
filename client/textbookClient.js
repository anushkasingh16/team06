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


const addbutton = document.getElementsId("btn-add-listing");
const deletebutton = document.createElementId("btn-delete-listing");

addbutton.addEvenetlistenr('click', async (e) => {
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
    await fetch('/storeBook', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
        },
        body: book,
    });
});

deletebutton.addEvenetlistenr('click', async(e) => {
    await fetch('/deleteBook', {
        method: 'DELETE',
        body: {"title": title.value},
    });
});




