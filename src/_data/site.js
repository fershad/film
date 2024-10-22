const environment = process.env.ELEVENTY_RUN_MODE;
import { config } from "../utils/image.config.js";
const { group, groupBy } = config;

const site = {
    title: "Film by Fershad",
    tagline: "Photos by Fershad Irani",
    description: "A collection of film photographs by Fershad Irani",
    lang: "en",
    baseUrl: environment === "serve" ? "http://localhost:8080" : "https://film.fershad.com",
    gallery: {
        group,
        groupBy,
    },
};

export default site;