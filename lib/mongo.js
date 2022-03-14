const MongoClient = require("mongodb").MongoClient;
const url = `mongodb://localhost:27017`;

const mongo = new MongoClient(url);

module.exports = mongo.connect();