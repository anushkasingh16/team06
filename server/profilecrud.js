import { MongoClient, ServerApiVersion } from 'mongodb';
import {v4 as uuid} from 'uuid';

export class ProfileDatabase {

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

    async createProfile(response, data) {
        // might not needs these if statements because of required in the profile.html when they sign up, but it is usefule for testing
        if(data["email"] === undefined){
            response.status(400).json(JSON.stringify({ error: `Email required` }));
        }else if(data["name"] === undefined){
            response.status(400).json(JSON.stringify({ error: `Name required` }));
        }else if(data["id"] === undefined){
            response.status(400).json(JSON.stringify({ error: `ID required` }));
        }else{
            const res = await this.collection.find({email: data["email"]}).toArray();
            if(res.length === 0){
                await this.collection.insertOne({ _id:uuid(), id:data["id"], email:data["email"], name:data["name"], phone: data["phone"], address: data["address"], swaps: data["swaps"], listings: data["listings"], ratings: data["ratings"]});
                const insertedData = await this.collection.findOne({email: data["email"]});
                response.status(200).json(insertedData);  
            } else {
                response.status(400).json({ error: `Email In Use` });  
            }
        }
    }

    async readProfile(response, data) {
        const res = await this.collection.find({email: data["email"]}).toArray();
        response.status(200).json(res);              
    }
    
    async userExists(response, data) {
        const res = await this.collection.find({email: data["email"]}).toArray();

        if(res.length === 0){
            response.status(200).json({ exist: false });
        } else {
            response.status(200).json({ exist: true });                
        }     
    }    
  
  }

