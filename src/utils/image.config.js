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
      type: "number",
      message: "Enter the image year (YYYY e.g 2024):",
    },
    month: {
      name: "month",
      type: "number",
      message: "Enter the image month (MM e.g 08):",
    },
    collection: {
      name: "collection",
      type: "list",
      message: "Enter the image collection:",
      choices: [
        "Norway",
        "Denmark",
        "England",
        "Germany",
        "Taiwan",
        "Japan",
        "Singapore",
        "India",
      ],
    },
    camera: {
      name: "camera",
      type: "list",
      message: "Enter the camera used:",
      choices: [
        "Olympus Pen EE-3",
      ]
    },
    film: {
      name: "film",
      type: "list",
      message: "Enter the film used:",
      choices: [
        "Kodak Portra 400",
        "Fujifilm Fujicolor 200",
      ],
    },
  },
};
