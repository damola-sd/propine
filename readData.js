const chalk = require("chalk");

const calculateInUSD = require("./src/util/calculateUSD");

let data = [];

//This function reads the data from a csv file, reduces it to its token and portfolio and calculates the amounts in USD
// const readData = () => {
//   fs.createReadStream("./data/transactions.csv")
//     .pipe(csv())
//     .on("data", function (row) {
//       //   console.log("started");
//       chalk.blue.bold("Reading data from csv!");
//       row.amount = Number(row.amount);
//       data.push(row);
//     })
//     .on("end", function () {
//       chalk.blue.bold("Data loaded!");
//       let portfolio = data.reduce((acc, current) => {
//         acc[current.token] =
//           current.transaction_type === "DEPOSIT"
//             ? current.amount++
//             : current.amount--;
//         return acc;
//       }, {});

//       // console.log(portfolio);
//       Object.keys(portfolio).forEach((val, index) => {
//         calculateInUSD(val).then((result) => {
//           //   console.log(result);
//           portfolio[val] = portfolio[val] * result.USD;
//           chalk.red.bold(portfolio);
//           if (Object.keys(portfolio).length === index) {
//             console.log(portfolio);
//           }
//         });
//       });
//       //   savetoDb(data);
//     });
// };

module.exports = { processNoParams, processTokenParams, processDateParams };
