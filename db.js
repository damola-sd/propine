const mongodb = require("mongodb").MongoClient;
const MONGODBURI = `mongodb+srv://Dammie:admin101@cluster0.ajb0x.mongodb.net/SpleetDB?retryWrites=true&w=majority`;

const saveToDB = (csvData) => {
  // const connection = await

  mongodb.connect(
    MONGODBURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) throw err;
      client
        .db("propine")
        .collection("transactions")
        .insertMany(csvData, (err, res) => {
          if (err) throw err;
          console.log(`Inserted: ${res.insertedCount} rows`);
          client.close;
        });
    }
  );
};

module.exports = saveToDB;
