import { collections } from "./collections.js";
import { years, months } from "./helpers.js";

export const config = {
  // Sort order for the images
  sort: "asc", // "asc" or "desc"
  // Group images in the Gallery view
  group: true, // true or false
  groupBy: "collection", // "collection" or "year"
  // Image metadata
  metadata: {
    portrait: {
      name: "portrait",
      type: "confirm",
      message: "Is the image in portrait orientation?",
    },
    title: {
      name: "title",
      type: "input",
      message: "Enter the image title:",
    },
    altText: {
      name: "altText",
      type: "input",
      message: "Describe the content of the image (used for alt text on website):",
    },
    story: {
      name: "story",
      type: "input",
      message: "Enter the image story or description:",
    },
    year: {
      name: "year",
      type: "list",
      message: "Enter the image year (YYYY e.g 2024):",
      choices: years,
    },
    month: {
      name: "month",
      type: "list",
      message: "Enter the image month (MM e.g 08):",
      choices: months
    },
    collection: {
      name: "collection",
      type: "list",
      message: "Enter the image collection:",
      choices: collections,
    },
    location: {
      name: "location",
      type: "input",
      message: "Enter the image location:",
    },
    camera: {
      name: "camera",
      type: "list",
      message: "Enter the camera used:",
      choices: [
        "Olympus Pen EE-3",
        "Canon AV-1",
        "Konica C35",
      ]
    },
    film: {
      name: "film",
      type: "list",
      message: "Enter the film used:",
      choices: [
        "Kodak Portra 400",
        "Fujifilm Fujicolor 200",
        "Fujifilm Fujicolor 100",
        "Kodak Color 200",
      ],
    },
  },
};
