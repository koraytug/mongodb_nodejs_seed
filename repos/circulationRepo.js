const { MongoClient } = require('mongodb');
const assert = require('assert');

function circulationRepo() {
  if (process.env.NODE_ENV !== 'production') require('dotenv').config();
  const uri = process.env.uri || '';
  const dbName = 'TESTAPP';

  function loadData(data) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(uri);
      try {
        await client.connect();
        const db = client.db(dbName);

        results = await db.collection('newspapers').insertMany(data);
        //   console.log(results.insertedCount, results.ops);
        assert.equal(data.length, results.insertedCount);

        resolve(results);
        client.close;
      } catch (error) {
        reject(error);
      }
    });
  }
  return { loadData };
}

module.exports = circulationRepo();
