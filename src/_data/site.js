const environment = process.env.ELEVENTY_RUN_MODE;

const site = {
    title: "11ty Starter Gallery",
    description: "A description of my site",
    lang: "en",
    baseUrl: environment === "serve" ? "http://localhost:8080" : "https://example.com",
};

export default site;