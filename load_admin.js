const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/blog";
// const admins = require('./admins')
async function main() {
const conn = await MongoClient.connect(url, {
useUnifiedTopology: true,
useNewUrlParser: true
});

const customers = conn.db().collection('admins');
await customers.insertMany(admins);

conn.close();
}

main();