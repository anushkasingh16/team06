const userFileName = 'users.JSON';
import { readFile, writeFile } from 'fs/promises';
function readFileName(path) {
    return async () => {
      try {
        const userFile = await readFile(path, 'utf8');
        const users = JSON.parse(userFile);
        return users;
      } catch (error) {
        // Likely the file doesn't exist
        return [];
      }
    };
  }
const readUsers = readFileName(userFileName);

class Users {
    constructor() {
      // we use an in-memory "database"; this isn't persistent but is easy
      // default user
      this.users = readUsers();
    }
  
    // Returns true iff the user exists.
    findUser(username) {
      if (!this.users[username]) {
        return false;
      } else {
        return true;
      }
    }
  
    // Returns true iff the password is the one we have stored (in plaintext = bad
    // but easy).
    validatePassword(name, pwd) {
      if (!this.findUser(name)) {
        return false;
      }
      if (this.users[name] !== pwd) {
        return false;
      }
      return true;
    }
  
    // Add a user to the "database".
    addUser(name, pwd) {
      if (this.findUser(name)) {
        return false;
      }
      this.users[name] = pwd;
      writeFile(userFileName, JSON.stringify(this.users), 'utf8');
      return true;
    }
  }
  
  export default new Users();