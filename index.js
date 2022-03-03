#! /usr/bin/env node

const program = require("commander");
const { readData, processNoParams } = require("./readData");
const dotenv = require("dotenv");
dotenv.config();

program
  .command("latest")
  .description("Displays the latest portfolio value per token in USD")
  .action(processNoParams);

// readData();

program.parse();
