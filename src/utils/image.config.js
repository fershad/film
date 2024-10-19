export const config = {
  // Sort order for the images
  sort: "asc", // "asc" or "desc"
  // Image metadata
  metadata: {
    title: {
      name: "title",
      type: "input",
      message: "Enter the image title:",
    },
    story: {
      name: "story",
      type: "input",
      message: "Enter the image story or description:",
    },
    year: {
      name: "year",
      type: "number",
      message: "Enter the image date (YYYY):",
    },
    month: {
      name: "month",
      type: "number",
      message: "Enter the image date (MM):",
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
  },
};
