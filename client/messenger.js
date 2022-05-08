// https://getbootstrap.com/docs/5.1/components/button-group/ 
// for attachments: https://mdbootstrap.com/docs/standard/forms/file/
// addevent listener for "enter" key to send text

import {day, time, timestamp} from "./time.js"

let helton = document.getElementById("Helton");
let anuskha = document.getElementById("Anushka");
let alan = document.getElementById("Alan");
let header = document.getElementById("ChatHeader");
let messagePage = document.getElementById("chatul");
let submitButton = document.getElementById("send");
let messagePlaceHolder = document.getElementById("messagePlaceHolder");
let users = {User1: {name: "Anushka", email: "anusingh@umass.edu"},
             User2: {name: "Helton", email: "hpongnon@umass.edu"}};

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

async function sendMessage(element){
    const text = messagePlaceHolder.value;

    if(text.length === 0){return;} // Dont send empty messages

    renderSent(element);

    const response = await fetch(`./messenger/create`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // TODO: Interaction is left blank for now, this should be in the format of '<user 1 email> ~ <user 2 email>' where the 2 emails are sorted alphabetically
        // TODO: From and to is left blank for now, this should be the name of the two individuals messaging. Use the profile db to get this info.
        body: JSON.stringify({interaction: users[0][1] + "~" + users[1][1] ,time:timestamp(),from:users[0][0],to:users[1][0],text:text,image:""})
    });
    const data = await response.json();
    await renderMessages();
    return data;
}

// TODO: this function should get all the messages from the database with the given interaction id (ie all messages between the two people)
//       and render them on the screen from the perspective of the current user.
async function renderMessages(){
    const response = await fetch(`./messenger/read`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({interaction:users[0][1] + "~" + users[1][1]}) // TODO replace blank interaction id
    });
    const data = await response.json();
    // Data is an array of message objects with the specified interaction id.


}

function submitText () { // event listener for submitted text
    return messagePlaceHolder.value;
}

helton.addEventListener("click", () => {chatSwitch(helton)});
anuskha.addEventListener("click", () => {chatSwitch(anuskha)});
alan.addEventListener("click", () => {chatSwitch(alan)});
submitButton.addEventListener("click", () => {sendMessage(messagePage)});

// Example message object
/*
{
    "uuid":"e5263e54-8d98-4cf6-8021-9438a48e2483",
    "interaction":"username1@gmail.com ~ username2@yahoo.com",
    "time":"1651964525890",
    "from":"Anushka Singh",
    "to":"Helton Pongnon",
    "text":"Hello!",
    "image":""
}
*/