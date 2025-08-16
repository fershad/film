import discoveredImages from "../utils/readCachedImages.js";

// Go through the discoveredImages and randomly assign a few images with a featured flag
const featuredImages = discoveredImages.filter((image) => Math.random() < 0.08);
const featuredImageIds = featuredImages.map((image) => image.file);

// Assign featured flag to images
discoveredImages.forEach((image) => {
  image.featured = featuredImageIds.includes(image.file);
});

export default discoveredImages;
