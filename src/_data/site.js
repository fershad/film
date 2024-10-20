const environment = process.env.ELEVENTY_RUN_MODE;
import { config } from "../utils/image.config.js";
const { group, groupBy } = config;

const site = {
    title: "Film",
    tagline: "Photos by Fershad Irani",
    description: "A description of my site",
    lang: "en",
    baseUrl: environment === "serve" ? "http://localhost:8080" : "https://example.com",
    gallery: {
        group,
        groupBy,
    },
};

console.log(site)

export default site;