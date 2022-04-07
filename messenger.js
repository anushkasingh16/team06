// https://getbootstrap.com/docs/5.1/components/button-group/ 
// for attachments: https://mdbootstrap.com/docs/standard/forms/file/
// addevent listener for "enter" key to send text

import {day, time} from "./Time.js"

let helton = document.getElementById("Helton");
let anuskha = document.getElementById("Anushka");
let alan = document.getElementById("Alan");
let header = document.getElementById("ChatHeader");
let messagePage = document.getElementById("chatul");
let submitButton = document.getElementById("send");;
let messagePlaceHolder = document.getElementById("messagePlaceHolder");

function chatSwitch (element) {
    header.innerHTML = element.id;
    messagePlaceHolder.placeholder = "Message " + element.id + "...";
}

function getDate () {
    const datetime = day() + " @ " + time();
    return datetime;
}

function renderSent (element) {
    let clearfix = document.createElement("li");
    clearfix.className = "clearfix";
    element.appendChild(clearfix);
    let data = document.createElement("div");
    data.className = "message-data text-right";
    clearfix.appendChild(data);
    let dateAndTime = document.createElement("span");
    dateAndTime.className = "message-data-time float-right";
    dateAndTime.innerHTML = "Sent, " + getDate();
    data.appendChild(dateAndTime);
    let mym = document.createElement("div");
    mym.className = "message other-message float-right";
    mym.innerText = submitText()
    clearfix.appendChild(mym);
    console.log("sent");
    console.log(submitText());
}

function renderRecieve (element) { // opposite of renderSent?
    console.log("recieved")
}

function submitText () { // event listener for submitted text
    return messagePlaceHolder.value;
}

helton.addEventListener("click", () => {chatSwitch(helton)});
anuskha.addEventListener("click", () => {chatSwitch(anuskha)});
alan.addEventListener("click", () => {chatSwitch(alan)});
submitButton.addEventListener("click", () => {renderSent(messagePage)});

/*

ORIGINALLY BELONGS UNDER LINE 81 IN MESSENGER.HTML (<ul class="m-b-0">)

<li class="clearfix">
    <div class="message-data">
        <span class="message-data-time">Sent, Today, 18:33</span>
    </div>
    <div class="message my-message">Hi, I'm interested in the calc textbook you have listed.</div>                                    
</li>                               
<li class="clearfix">
    <div class="message-data text-right">
        <span class="message-data-time">Sent, Today, 19:07</span>
    </div>
    <div class="message other-message float-right"> Great! I'm open to trade for the CS 383 textbook if you have it, or sell it for $25. </div>
</li>
<li class="clearfix">
    <div class="message-data text-right">
        <span class="message-data-time">Sent, Today, 19:07</span>
    </div>
    <div class="message other-message float-right"> <img src="images/textbook.jpg" alt="textbook image"> </div>
</li>
<li class="clearfix">
    <div class="message-data text-right">
        <span class="message-data-time">Sent, Today, 19:07</span>
    </div>
    <div class="message other-message float-right"> This one, if you have it </div>
</li>
*/
