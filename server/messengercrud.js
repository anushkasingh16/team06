import { MongoClient, ServerApiVersion } from 'mongodb';
import {v4 as uuid} from 'uuid';

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
      this.collection = this.db.collection('messages');
  }

  async close() {
      this.client.close();
  }

  async createMessage(response, data) {
    if (data["time"] === undefined) {
      response.status(400).json(JSON.stringify({ error: `Time required` }));
    }
    const msgUuid = uuid();
    await this.collection.insertOne({_id:msgUuid, interaction:data["interaction"], time:data["time"], from:data["from"], to:data["to"], text: data["text"], image:data["image"]});
    const insertedData = await this.collection.findOne({_id: msgUuid});
    response.status(200).json(insertedData);  
  }

  async readMessages(response, data) {
    const res = await this.collection.find({interaction: data["interaction"]}).toArray();
    response.status(200).json(res);              
  }
}