const btnSignUp = document.getElementById("btnSignUp");
const email = document.getElementById("emailInput");
const spireID = document.getElementById("idInput");
const password = document.getElementById("passwordInput");
const passwordConfirm = document.getElementById("passwordInputConfirm");
const fullName = document.getElementById("nameInput");
const phoneNum = document.getElementById("phoneInput");
const address = document.getElementById("addressInput");
const btnToS = document.getElementById("gridCheck");
const form = document.getElementById("signup-form");

btnSignUp.addEventListener("click", signUpButton);

async function signUpButton() {
    console.log(form);
    console.log("Signing Up");
    if (form.checkValidity()) {
        
        if(password.value !== passwordConfirm.value){
            alert("Make sure the password fields match!");
            return;
        }
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // From emailregex.com
        if(!email.value.match(emailRegex)){
            alert("Please enter a valid email address");
            return;
        }

        const userExists = await checkForExistingUser(email.value);
        if(userExists){
            alert("Email already in use!");
            return;
        }

        let userObj = {"email":email.value,"name":fullName.value,"id":spireID.value,"address":address.value,"phone":phoneNum.value,"swaps":0,"listings":0,"ratings":0};

        await signUpUser(userObj);

        location.href = "/home";
    }else{
        alert("You must fill out all required fields!");
    }
}

async function checkForExistingUser(email){
    const body = {email: email};
    const response = await fetch(`./existingUser`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data["exists"];
}

async function signUpUser(userObj){
    const response = await fetch(`./registerNewUser`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObj)
    });
    const data = await response.json();
    return data;
}