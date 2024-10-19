// cli.js
import fs from "fs/promises";
import inquirer from "inquirer";
import { config } from "./image.config.js";

const { metadata } = config;

// Define questions for metadata
const questions = Object.values(metadata).map((obj) => {
    return obj;
  })


// Main function to run the CLI
const runCLI = async () => {
  const answers = await inquirer.prompt(questions);
    const { title, story, date } = answers;
    console.log({answers})
};

runCLI();