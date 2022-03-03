const csv = require("csv-parser");
const fs = require("fs");
const chalk = require("chalk");
const savetoDb = require("./db");
const { Transform } = require("stream");

const calculateInUSD = require("./calculateUSD");

let data = [];

//This function reads the data from a csv file, reduces it to its token and portfolio and calculates the amounts in USD
const readData = () => {
  fs.createReadStream("./data/transactions.csv")
    .pipe(csv())
    .on("data", function (row) {
      //   console.log("started");
      chalk.blue.bold("Reading data from csv!");
      row.amount = Number(row.amount);
      data.push(row);
    })
    .on("end", function () {
      chalk.blue.bold("Data loaded!");
      let portfolio = data.reduce((acc, current) => {
        acc[current.token] =
          current.transaction_type === "DEPOSIT"
            ? current.amount++
            : current.amount--;
        return acc;
      }, {});

      // console.log(portfolio);
      Object.keys(portfolio).forEach((val, index) => {
        calculateInUSD(val).then((result) => {
          //   console.log(result);
          portfolio[val] = portfolio[val] * result.USD;
          chalk.red.bold(portfolio);
          if (Object.keys(portfolio).length === index) {
            console.log(portfolio);
          }
        });
      });
      //   savetoDb(data);
    });
};

function DB() {
  return fs.createReadStream("./data/transactions.csv").pipe(csv());
}

const noParams = (stream) => {
  const acc = {};

  return new Promise((resolve, reject) => {
    stream
      .on("data", (current) => {
        acc[current.token] =
          current.transaction_type === "DEPOSIT"
            ? current.amount++
            : current.amount--;
      })
      .on("error", (error) => reject(error))
      .on("end", () => resolve(acc));
  });
};

async function processNoParams() {
  const data = await noParams(DB());
  console.log(data);
  Object.keys(data).forEach((val, index) => {
    calculateInUSD(val).then((result) => {
      //   console.log(result);
      data[val] = data[val] * result.USD;
      chalk.red.bold(data);
      if (Object.keys(data).length === index) {
        chalk.red.bold(data);
        console.log(data);
      }
    });
  });
}

module.exports = { readData, processNoParams };
