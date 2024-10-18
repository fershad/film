const environment = process.env.ELEVENTY_RUN_MODE;

export const site = {
    title: "My Eleventy Site",
    description: "A description of my site",
    lang: "en",
    baseUrl: environment === "serve" ? "http://localhost:8080" : "https://example.com",
};