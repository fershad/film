import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import fs from "node:fs/promises";
import path from "node:path";
import CleanCSS from "clean-css";
import pluginRss from "@11ty/eleventy-plugin-rss";

const __dirname = import.meta.dirname;

export default async function (eleventyConfig) {
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

  // eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
  //   // which file extensions to process
  //   extensions: "html",

  //   // Add any other Image utility options here:

  //   // optional, output image formats
  //   formats: ["webp", "jpeg"],
  //   // formats: ["auto"],

  //   // optional, output image widths
  //   widths: ["auto", 400, 800, 1600, 2200],

  //   useCache: true,

  //   // optional, attributes assigned on <img> override these values.
  //   defaultAttributes: {
  //     loading: "lazy",
  //     decoding: "async",
  //   },
  // });
  //
  eleventyConfig.addFilter("cloudinarySource", (url) => {
    // Find the "upload/" string and add "f_auto,q_auto" to that
    const cloudinaryUrl = url.replace("upload/", "upload/f_auto/q_auto/");
    return cloudinaryUrl;
  });

  eleventyConfig.addFilter("cloudinarySrcset", (url) => {
    const w400 = url.replace("upload/", "upload/f_auto/q_auto/c_scale,w_400/");
    const w800 = url.replace("upload/", "upload/f_auto/q_auto/c_scale,w_800/");
    const w1600 = url.replace(
      "upload/",
      "upload/f_auto/q_auto/c_scale,w_1600/",
    );
    const w2075 = url.replace(
      "upload/",
      "upload/f_auto/q_auto/c_scale,w_2075/",
    );

    const srcset = `${w400} 400w, ${w800} 800w, ${w1600} 1600w, ${w2075} 2075w`;
    return srcset;
  });

  eleventyConfig.addFilter("prettyJson", (value = "") => {
    // Remove the altText from the JSON
    delete value.altText;
    const json = JSON.stringify(value, null, 2);
    return json;
  });

  eleventyConfig.addFilter("set_featured", (images) => {
    // Go through the discoveredImages and randomly assign a few images with a featured flag
    const featuredImages = images.filter((image) => Math.random() < 0.05).pop();

    if (featuredImages) {
      // Assign featured flag to images
      images.forEach((image) => {
        image.featured = featuredImages.file === image.file;
      });
    }

    return images;
  });

  eleventyConfig.addPlugin(pluginRss);
}
