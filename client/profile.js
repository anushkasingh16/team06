const profName = document.getElementById("profName");
const email = document.getElementById("profEmail");
const id = document.getElementById("profID");
const addr = document.getElementById("profAddr");
const phone = document.getElementById("profPhone");
const swaps = document.getElementById("profSwaps");
const lists = document.getElementById("profLists");
const rating = document.getElementById("profRating");

const menu = document.getElementById("profMenu");


const userEmail = "tviarengo@umass.edu"; // Hard Code user until we get login finished
const userData = (await getUser(userEmail))[0];
console.log(userData);

profName.innerHTML = `Name: ${userData["name"]}`;
email.innerHTML = `Email: ${userData["email"]}`;
id.innerHTML = `Spire ID: ${userData["id"]}`;
addr.innerHTML = `Current Address / Dorm Hall: ${userData["address"]}`;
phone.innerHTML = `Phone Number: ${userData["phone"]}`;
swaps.innerHTML = `Completed Swaps: ${userData["swaps"]}`;
lists.innerHTML = `Current Lisitngs: ${userData["listings"]}`;
rating.innerHTML = `User Rating: ${userData["ratings"]}`;

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







