const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

// Use port-forwarded MongoDB connection
let url = 'mongodb://localhost:27017';
let filename = `${__dirname}/gifts.json`;
const dbName = 'giftsdb';
const collectionName = 'gifts';

// notice you have to load the array of gifts into the data object
const data = JSON.parse(fs.readFileSync(filename, 'utf8')).docs;

// connect to database and insert data into the collection
async function loadData() {
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB client
        await client.connect();
        console.log("Connected successfully to server");

        // database will be created if it does not exist
        const db = client.db(dbName);

        // collection will be created if it does not exist
        const collection = db.collection(collectionName);
        
        // Clear existing data first
        await collection.deleteMany({});
        console.log("Cleared existing data");

        // Insert data into the collection
        const insertResult = await collection.insertMany(data);
        console.log('Inserted documents:', insertResult.insertedCount);
    } catch (err) {
        console.error(err);
    } finally {
        // Close the connection
        await client.close();
    }
}

loadData();