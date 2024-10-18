import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import fs from "node:fs/promises";
import path from "node:path";
import CleanCSS from "clean-css";

const __dirname = import.meta.dirname;


export default async function(eleventyConfig) {
    eleventyConfig.setInputDirectory("src");
	eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
    eleventyConfig.addPassthroughCopy("static");

    eleventyConfig.addShortcode("minifiedcss", async function (code) {
		return `<style>
	  ${await fs
			.readFile(path.resolve(__dirname, "./static/index.css"))
			.then((data) => new CleanCSS().minify(data).styles)}
	</style>`;
	});
    

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "html",

		// Add any other Image utility options here:

		// optional, output image formats
		formats: ["webp", "jpeg"],
		// formats: ["auto"],

		// optional, output image widths
		// widths: ["auto"],

		// optional, attributes assigned on <img> override these values.
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});
};