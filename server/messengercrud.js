import * as http from 'http';
import * as url from 'url';
import express from 'express';
import logger from 'morgan';
import { MongoClient, ServerApiVersion } from 'mongodb';
//import { readFile, writeFile } from 'fs/promises';

export class MessengerDatabase {

  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
      this.client = await MongoClient.connect(this.dburl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverApi: ServerApiVersion.v1,
      });

    // Get the database.
      this.db = this.client.db('textswap');

    // Init the database.
      await this.init();
  }

  async init() {
      this.collection = this.db.collection('userData');
  }

  async close() {
      this.client.close();
  }

  async createMessage(response, data) {
    if (data["time"] === undefined) {
      response.status(400).json(JSON.stringify({ error: `Time required` }));
    }
    const res = await this.collection.find({time: data["time"]}, async function(err, col) {
    if(col.length === 0 && err) {
        await this.collection.insertOne({ time:data["time"], from:data["from"], to:data["to"], text: data["text"]});
        response.status(200).json(data);  
      } 
      else {
          response.status(400).json({ error: `Time stamp already used` });  
        }
    });
  }

  async readMessages(response, data) {
    const res = await this.collection.find({time: data["time"]});
    response.status(200).json(res);              
  }
}


// const dataObj = {};
// const JSONFile = 'messenger.json'
// const headerFields = { 'Content-Type': 'application/json' };

// async function reload(filename) {
//     try {
//       const data = await readFile(filename, { encoding: 'utf8' });
//       dataObj = JSON.parse(data);
//     } catch (err) {
//       dataObj = {};
//     }
//   }
  
//   async function saveData() {
//     try {
//       const data = JSON.stringify(dataObj);
//       await writeFile(JSONFile, data, { encoding: 'utf8' });
//     } catch (err) {
//       console.log(err);
//     }
//   }

// async function createMessage (response, from, to, time, text) {
//     if (time === undefined) {
//         // 400 - Bad Request
//         response.status(400).json({ error: 'Unique Time ID required' });
//       } 
//       else {
//         await reload(JSONFile);
//         if (dataObj[from + '/' + to] !== undefined) {
//             dataObj[from + '/' + to][time] = text 
//         }
//         else {
//             dataObj[from + '/' + to] = {time: text};
//         }
//         await saveData();
//       }
// }

// async function readMessages (response, from, to) {
//     await reload(JSONFile);
//     if (dataObj[from + '/' + to] !== undefined) {
//         response.json(dataObj[from + '/' + to]);;
//     }
//     else {
//         response.status(404).json({ error: 'No Message found' });
//     }
// }

// export {createMessage, readMessages};