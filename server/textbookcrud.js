import { MongoClient, ServerApiVersion } from 'mongodb';

export class TextbookDatabase {

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
        this.collection = this.db.collection('listings');
    }
  
    async close() {
        this.client.close();
    }

    async createBook(response, data) {
        //need to ccheck what values are optional and what are required
        // edition and subtitle are optional
        const res = await this.collection.insertOne({_id: data["isbn"], option: data["option"], listlabel: data["listlabel"], title: data["title"], subtitle: data["subtitle"],
                                                     author: data["author"], edition: data["edition"], trade: data["trade"], sell: data["sell"], image: data["image"]});
        response.status(200).json(res);
    }

    async getBook(response, data) {
        const res = await this.collection.find({option: data["option"], _id: data["isbn"]});
        response.status(200).json(res); 
    }

    async deleteBook(response, data) {
        const res = await this.collection.remove({option: data["option"], _id: data["isbn"]});
        response.status(200).json(res); 
    }
       
  
  }
