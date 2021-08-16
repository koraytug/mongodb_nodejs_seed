const MongoClient = require('mongodb').MongoClient;

const circulationRepo = require('./repos/circulationRepo');
const data = require('./circulation.json');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const uri = process.env.uri || '';
const dbName = 'TESTAPP';

// async function main() {
//   const client = new MongoClient(uri);
//   await client.connect();

//   const admin = client.db(dbName).admin();
//   console.log(await admin.serverStatus());
//   console.log(await admin.listDatabases());
// }

// main();

async function main() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    const result = await circulationRepo.loadData(data);
    console.log(result.insertedCount, results.ops);

    const admin = client.db(dbName).admin();
    // Make the appropriate DB calls
    //console.log(await admin.serverStatus());

    await client.db(dbName).dropDatabase();

    console.log(await admin.listDatabases());
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
