import fs from "node:fs/promises";
import path from "node:path";
import CleanCSS from "clean-css";
import pluginRss from "@11ty/eleventy-plugin-rss";
import Image from "@11ty/eleventy-img";

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

  eleventyConfig.addFilter("cloudinarySmallImages", (url) => {
    const w400 = url.replace("upload/", "upload/f_auto/q_auto/c_scale,w_80/");
    const w800 = url.replace("upload/", "upload/f_auto/q_auto/c_scale,w_160/");
    const w1600 = url.replace("upload/", "upload/f_auto/q_auto/c_scale,w_240/");
    const w2075 = url.replace("upload/", "upload/f_auto/q_auto/c_scale,w_320/");

    const srcset = `${w400} 80w, ${w800} 160w, ${w1600} 240w, ${w2075} 360w`;
    return srcset;
  });

  eleventyConfig.addFilter("heroImageURL", (value = "") => {
    return value.replace("upload/", "upload/f_auto/q_auto/");
  });

  eleventyConfig.addFilter("heroLowQual", (value = "") => {
    return value.replace("upload/", "upload/f_auto/q_5/e_blur:400/");
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

  eleventyConfig.addFilter("getHeroImage", (images) => {
    const heroImages = images.filter(
      (image) =>
        !image.metadata.portrait && image.metadata.camera === "Canon AV-1",
    );
    // Return a random image from the filtered list
    //
    // console.log(heroImages);
    const randomIndex = Math.floor(Math.random() * heroImages.length);
    const randomImage = heroImages[randomIndex];

    return randomImage ? randomImage.meta.url : null;
  });

  eleventyConfig.addFilter("getHeroImageUrl", (images, path) => {
    const image = images.find((image) => image.meta.path === path);
    return image ? image.meta.url : null;
  });

  eleventyConfig.addFilter("isNew", (birthtime) => {
    // Parse the date string
    const date = new Date(birthtime);

    // Get current time
    const currentTime = new Date();

    // Calculate the difference in milliseconds
    const differenceInMs = currentTime - date;

    // Convert milliseconds to days
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

    // Check if the date is within the specified days
    return differenceInDays <= 45 ? "new" : "";
  });

  eleventyConfig.addFilter("groupingHasNew", (grouping, images) => {
    const newImages = images.filter((image) => {
      // Parse the date string
      const date = new Date(image.meta.birthtime);

      // Get current time
      const currentTime = new Date();

      // Calculate the difference in milliseconds
      const differenceInMs = currentTime - date;

      // Convert milliseconds to days
      const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

      // Check if the date is within the specified days
      return differenceInDays <= 45;
    });

    return newImages.length > 0;
  });

  eleventyConfig.addAsyncShortcode(
    "lowQualityImage",
    async function (src, alt = "", className = "") {
      if (!src) return "";

      const isRemote = /^https?:\/\//i.test(src);
      const cleanedSrc = src.replace(/^\//, "");

      // Support both root-level paths like /static/... and src/... paths.
      let input = src;
      if (!isRemote) {
        const candidates = [
          path.resolve(__dirname, cleanedSrc),
          path.resolve(__dirname, "src", cleanedSrc),
        ];

        for (const candidate of candidates) {
          try {
            await fs.access(candidate);
            input = candidate;
            break;
          } catch {
            // try next candidate
          }
        }
      }

      const metadata = await Image(input, {
        widths: [1400], // tiny placeholder width
        formats: ["jpeg"],
        outputDir: path.resolve(__dirname, "_site/img/lowqual/"),
        urlPath: "/img/lowqual/",
        sharpJpegOptions: {
          quality: 12, // low quality
          progressive: true,
          mozjpeg: true,
        },
      });

      const low = metadata.jpeg[0];
      const classAttr = className ? ` class="${className}"` : "";

      return `<img src="${src}" width="1400" height="950" alt="${alt}" ${classAttr} style="background:url(${low.url});background-size: cover;background-position: center center;"  loading="eager" decoding="async">`;
    },
  );

  eleventyConfig.addAsyncShortcode("lowQImg", async function (src) {
    if (!src) return "";

    const isRemote = /^https?:\/\//i.test(src);
    const cleanedSrc = src.replace(/^\//, "");

    // Support both root-level paths like /static/... and src/... paths.
    let input = src;
    if (!isRemote) {
      const candidates = [
        path.resolve(__dirname, cleanedSrc),
        path.resolve(__dirname, "src", cleanedSrc),
      ];

      for (const candidate of candidates) {
        try {
          await fs.access(candidate);
          input = candidate;
          break;
        } catch {
          // try next candidate
        }
      }
    }

    const metadata = await Image(input, {
      // widths: [2075], // tiny placeholder width
      formats: ["jpeg"],
      outputDir: path.resolve(__dirname, "_site/img/lowqual/"),
      urlPath: "/img/lowqual/",
      sharpJpegOptions: {
        quality: 12, // low quality
        progressive: true,
        mozjpeg: true,
      },
    });

    const low = metadata.jpeg[0];

    return low.url;
  });

  eleventyConfig.addPlugin(pluginRss);
}
