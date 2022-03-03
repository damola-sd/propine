const CsvStream = require("../util/csvStream");
const calculateInUSD = require("../util/calculateUSD");

const dateAndTokenParams = (stream, date, token) => {
  const acc = {};

  return new Promise((resolve, reject) => {
    stream
      .on("data", (current) => {
        const rowDate = new Date(Number(current.timestamp));
        const currentDayOfMonth = rowDate.getDate();
        const currentMonth = rowDate.getMonth();
        const currentYear = rowDate.getFullYear();

        const dateString =
          currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
        if (date === dateString && token === current.token) {
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

async function processDateAndTokenParams(date, token) {
  let count = 0;

  const data = await dateAndTokenParams(CsvStream(), date, token);
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

module.exports = processDateAndTokenParams;
