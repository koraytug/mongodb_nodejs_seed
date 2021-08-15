const MongoClient = require('mongodb').MongoClient;
 

if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const uri = process.env.uri || '';
const dbName = 'TESTAPP';

async function main() {
  const client = new MongoClient(uri);
  await client.connect();

  const admin = client.db(dbName).admin();
  console.log(await admin.serverStatus());
  console.log(await admin.listDatabases());
}

main();
