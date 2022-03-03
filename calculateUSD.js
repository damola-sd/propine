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

module.exports = calculateInUSD;
