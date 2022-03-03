const CsvStream = require("../util/csvStream");
const calculateInUSD = require("../util/calculateUSD");

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
  let count = 0;

  const data = await noParams(CsvStream());
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

module.exports = processNoParams;
