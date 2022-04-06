// https://getbootstrap.com/docs/5.1/components/button-group/ 

let helton = document.getElementById("Helton");
let anuskha = document.getElementById("Anushka");
let alan = document.getElementById("Alan");
let header = document.getElementById("ChatHeader");
let nameButtonClass = document.getElementsByClassName("btnradio");
let messagePage = document.getElementsByClassName("m-b-0");
let submitButton = document.getElementsByClassName("submit");
let messagePlaceHolder = document.getElementById("messagePlaceHolder");


function chatSwitch (element) {
    header.innerHTML = element.id;
    messagePlaceHolder.placeholder = "Message " + element.id + "...";
}

function renderPage () {

}

function submitText () { // event listener for 

}

helton.addEventListener("click", () => {chatSwitch(helton)});
anuskha.addEventListener("click", () => {chatSwitch(anuskha)});
alan.addEventListener("click", () => {chatSwitch(alan)});
helton.addEventListener("click", () => {renderPage(helton)});
anuskha.addEventListener("click", () => {renderPage(anuskha)});
alan.addEventListener("click", () => {renderPage(alan)});

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
