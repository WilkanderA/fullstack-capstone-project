require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL
let url = `${process.env.MONGO_URL}`;
const dbName = 'giftsdb';
const collectionName = 'gifts';

async function countGifts() {
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB client
        await client.connect();
        console.log("Connected successfully to MongoDB server");

        // Get the database
        const db = client.db(dbName);

        // Get the collection
        const collection = db.collection(collectionName);
        
        // Count documents in the gifts collection
        const count = await collection.countDocuments();
        console.log(`Number of documents in gifts collection: ${count}`);
        
    } catch (err) {
        console.error('Error:', err);
    } finally {
        // Close the connection
        await client.close();
        console.log("Connection closed");
    }
}

countGifts();