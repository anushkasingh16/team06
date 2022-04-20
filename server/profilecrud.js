import { readFile, writeFile } from 'fs/promises';

const userFile = 'userdata.json'
const loginFile = 'logindata.json';

async function reload(filename) {
    try {
        const data = await readFile(filename, { encoding: 'utf8' });
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
}

async function saveData(filename, dataObj) {
    try {
        const data = JSON.stringify(dataObj);
        await writeFile(filename, data, { encoding: 'utf8' });
    } catch (err) {
        console.log(err);
    }
}

async function createProfile(response, data) {
    const userData = await reload(userFile);
    if(data["email"] === undefined){
        response.status(400).json(JSON.stringify({ error: `Email required` }));
    }else if(data["name"] === undefined){
        response.status(400).json(JSON.stringify({ error: `Name required` }));
    }else if(data["id"] === undefined){
        response.status(400).json(JSON.stringify({ error: `ID required` }));
    }else{
        let found = false;
        userData.forEach(userObj =>{
            if(userObj["email"] === data["email"]){
                found = true;
            }
        });
        if(found){
            response.status(400).json(JSON.stringify({ error: `Email In Use` }));
        }else{
            userData.push(data);
            await saveData(userFile, userData);
            response.status(200).json(data);
        }
    }
}

async function updateProfile(response, data){
    // Not needed for now
    response.status(404).json(JSON.stringify({ error: `Not Implemented` }));
}

async function readProfile(response, data) {
    const userData = await reload(userFile);
    let user = {};
    userData.forEach(userObj =>{
        if(userObj["email"] === data["email"]){
            user = userObj;
        }
    });
    response.status(200).json(user);
}

async function userExists(response,data){
    const userData = await reload(userFile);
    let found = false;
    userData.forEach(userObj =>{
        if(userObj["email"] === data["email"]){
            found = true;
        }
    });
    if(!found){
        response.status(200).json({ exists: false });
    }else{
        response.status(200).json({ exists: true });
    }
}


export { createProfile, updateProfile, readProfile, userExists };