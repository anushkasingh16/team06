const profName = document.getElementById("profName");
const email = document.getElementById("profEmail");
const id = document.getElementById("profID");
const addr = document.getElementById("profAddr");
const phone = document.getElementById("profPhone");
const swap = document.getElementById("profSwaps");
const list = document.getElementById("profLists");
const rating = document.getElementById("profRating");

const inputProfName = document.getElementById("nameInput");
const inputEmail = document.getElementById("emailInput");
const inputId = document.getElementById("idInput");
const inputAddr = document.getElementById("addressInput");
const inputPhone = document.getElementById("phoneInput");

const menu = document.getElementsByClassName("profMenu");
const signUp = document.getElementById("btnSignUp");
const signIn = document.getElementById("btnSignIn");


const userEmail = "hpongnon@umass.edu"; // Hard Code user until we get login finished
//const userData = await getUser(userEmail);


// swap.innerText = `Completed Swaps: ${userData["swaps"]}`;
// list.innerText = `Current Lisitngs: ${userData["listings"]}`;
// rating.innerText = `User Rating: ${userData["rating"]}`;

let emailId = null;


// when a user click on profile tag
async function getUser(email){
    const response = await fetch(`./getUser`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email":email})
    });
    const data = await response.json();
    return data;
}

// when a user create an account, a new user is created
async function createUser(email, id, name, phone, address) {
    const response = await fetch ('/registerNewUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'           
        },
        body: JSON.stringify({"email": email, "id": id, "name": name, "phone": phone, "address": address}),
    });
    const data = await response.json();
    return data;
}

// when a user creates / sign in an account the function would check if user already made an similar account
async function userExist(email) {
    const response = await fetch('/existingUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email":email})
    });
    const data = await response.json();
    return data;
}


signUp.addEventListener('click', async () => {
    await createUser(inputEmail.innerText, inputId.innerText, inputProfName.innerText, inputPhone.innerText, inputAddr.innerText);
});


menu.addEventListener('click', async () => {
    const userData = await getUser(emailId);
    profName.innerText = `Name: ${userData["name"]}`;
    email.innerText = `Email: ${userData["email"]}`;
    id.innerText = `Spire ID: ${userData["_id"]}`;
    addr.innerText = `Current Address / Dorm Hall: ${userData["address"]}`;
    phone.innerText = `Phone Number: ${userData["number"]}`;
});

signIn.addEventListener('click', async () => {
    emailId == document.getElementById("email-id").innerText;
    const found = await userExist(emailId);
    if (found["exist"]) {
        const userData = await getUser(emailId);
        profName.innerText = `Name: ${userData["name"]}`;
        email.innerText = `Email: ${userData["email"]}`;
        id.innerText = `Spire ID: ${userData["_id"]}`;
        addr.innerText = `Current Address / Dorm Hall: ${userData["address"]}`;
        phone.innerText = `Phone Number: ${userData["number"]}`;
    } else {

    }
})










