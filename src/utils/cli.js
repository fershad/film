// cli.js
import inquirer from "inquirer";
import { config } from "./image.config.js";
import terminalImage from "terminal-image";

const { metadata } = config;

// Define questions for metadata
const questions = [
  ...Object.values(metadata).map((obj) => {
    return obj;
  }),
];

// Main function to run the CLI
const runCLI = async (imagePath) => {
  console.log(await terminalImage.file(imagePath, { width: "60%" }));
  const answers = await inquirer.prompt(questions);
  console.log({ answers });
  return answers;
};

export default runCLI;
