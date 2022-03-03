## Propine Assessment

_This tool calculates the token balance in USD after reading information from a CSV file with 3 million records._

Due to the large size of the CSV file, it has not been uploaded to this repo. To run, download [here](https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip) and add to a folder called data in the root of this project

# Streams

I decided to use Streams to read this data as NodeJs default memory size is not large enough to hold the data stored in the csv file. One consideration was to read the data and update a DB to allow faster processing but I decided to stick with reading the CSV directly as more data could be added to the file making the DB's data stale.
In my solution, I'm using [csv-parser](https://www.npmjs.com/package/csv-parser) which works on streams to process the data into an object and then processing this data to retrieve the expected results for each of the CLI's commands.

The CLI is called propine and it has four commands - `latest` Which collects no parameters and returns the latest portfolio value per token in USD - `balance` which accepts a token as a parameter and returns the latest portfolio value for that token in USD - `balanceOnDate` which accepts a date in the format dd-m-yyy and returns the portfolio value per token in USD on that date - 'tokenBalanceOnDate` which accepts date and token as parameters and returns he portfolio value of that token in USD on that date
