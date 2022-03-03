#! /usr/bin/env node

const program = require("commander");
const processNoParams = require("./src/actions/noParams");
const processDateParams = require("./src/actions/dateParams");
const processTokenParams = require("./src/actions/tokenParams");
const processDateAndTokenParams = require("./src/actions/dateAndTokenParams");

program
  .command("latest")
  .description("Displays the latest portfolio value per token in USD")
  .action(processNoParams);

program
  .command("balance <token>")
  .description("Calculates the portfolio balance for a token")
  .action(processTokenParams);

program
  .command("balanceOnDate <date>")
  .description(
    "Calculates the portfolio balance for all tokens on a particular date. Date in format DD-MM-YYYY"
  )
  .action(processDateParams);

program
  .command("tokenBalanceOnDate <date> <token>")
  .description(
    "Calculates the portfolio balance for a token on a particular date. Date in format DD-MM-YYYY"
  )
  .action(processDateAndTokenParams);

program.parse();
