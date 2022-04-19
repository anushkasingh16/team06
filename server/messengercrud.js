import * as http from 'http';
import * as url from 'url';
import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';

const dataObj = {};
const JSONFile = 'messenger.json'
const headerFields = { 'Content-Type': 'application/json' };

async function reload(filename) {
    try {
      const data = await readFile(filename, { encoding: 'utf8' });
      dataObj = JSON.parse(data);
    } catch (err) {
      dataObj = {};
    }
  }
  
  async function saveData() {
    try {
      const data = JSON.stringify(dataObj);
      await writeFile(JSONFile, data, { encoding: 'utf8' });
    } catch (err) {
      console.log(err);
    }
  }

async function createMessage (response, from, to, time, text) {
    if (time === undefined) {
        // 400 - Bad Request
        response.status(400).json({ error: 'Unique Time ID required' });
      } 
      else {
        await reload(JSONFile);
        if (dataObj[from + '/' + to] !== undefined) {
            dataObj[from + '/' + to][time] = text 
        }
        else {
            dataObj[from + '/' + to] = {time: text};
        }
        await saveData();
      }
}

async function readMessages (response, from, to) {
    await reload(JSONFile);
    if (dataObj[from + '/' + to] !== undefined) {
        response.json(dataObj[from + '/' + to]);;
    }
    else {
        response.status(404).json({ error: 'No Message found' });
    }
}

export {createMessage, readMessages};