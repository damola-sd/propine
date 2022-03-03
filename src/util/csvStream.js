const csv = require("csv-parser");
const fs = require("fs");

const CsvStream = () => {
  return fs.createReadStream("./data/transactions.csv").pipe(csv());
};

module.exports = CsvStream;
