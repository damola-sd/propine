const CsvStream = require("../util/csvStream");
const calculateInUSD = require("../util/calculateUSD");

const tokenParams = (stream, token) => {
  const acc = {};

  return new Promise((resolve, reject) => {
    stream
      .on("data", (current) => {
        if (current.token === token) {
          acc[current.token] =
            current.transaction_type === "DEPOSIT"
              ? current.amount++
              : current.amount--;
        }
      })
      .on("error", (error) => reject(error))
      .on("end", () => resolve(acc));
  });
};

async function processTokenParams(token) {
  let count = 0;

  const data = await tokenParams(CsvStream(), token);
  const numberOfTokens = Object.keys(data).length;
  Object.keys(data).forEach(async (val) => {
    let rate = await calculateInUSD(val);
    data[val] = data[val] * rate.USD;
    count++;
    if (count === numberOfTokens) {
      console.log(data);
    }
  });
}

module.exports = processTokenParams;
