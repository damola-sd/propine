const fetch = require("node-fetch");

const calculateInUSD = async (val) => {
  try {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${val}&tsyms=USD`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// const data = { BTC: 0.085935, ETH: 0.533424, XRP: 0.945639 };

// let count = 0;
// const portfolio = {};
// const numberOfTokens = Object.keys(data).length;

// Object.keys(data).forEach(async (val, index) => {
//   const res = await calculateInUSD(val);
//   data[val] = data[val] * res.USD;
//   count++;
//   if (count === numberOfTokens) {
//     console.log(data);
//   }
//   // console.log("inside", data);
// });
// // console.log("outside", data);

module.exports = calculateInUSD;
