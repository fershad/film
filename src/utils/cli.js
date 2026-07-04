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
  try {
    console.log(await terminalImage.file(imagePath, { width: "60%" }));
    const answers = await inquirer.prompt(questions);
    console.log({ answers });
    return answers;
  } catch (error) {
    console.error("Couldn't generate image.", imagePath);
  }
};

export default runCLI;
