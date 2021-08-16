const MongoClient = require('mongodb').MongoClient;

const circulationRepo = require('./repos/circulationRepo');
const data = require('./circulation.json');

const assert = require('assert');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const uri = process.env.uri || '';
const dbName = 'TESTAPP';

async function main() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    const result = await circulationRepo.loadData(data);
    assert.equal(data.length, result.insertedCount);
    // console.log(result.insertedCount, results.ops);

    const getData = await circulationRepo.get();
    assert.equal(data.length, getData.length);
  } catch (e) {
    console.error(e);
  } finally {
    const admin = client.db(dbName).admin();

    await client.db(dbName).dropDatabase();

    // Make the appropriate DB calls
    //console.log(await admin.serverStatus());
    console.log(await admin.listDatabases());

    await client.close();
  }
}

main().catch(console.error);
