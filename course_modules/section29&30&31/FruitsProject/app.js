import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri = "mongodb://localhost/";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('fruitsDB');
    const fruits = database.collection('fruits');
    // Query for a movie that has the title 'Back to the Future'
    const query = { name: 'Apple' };
    const fruit = await fruits.findOne(query);
    console.log(fruit);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);