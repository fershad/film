import { config } from "./image.config.js";
import fs from "fs/promises";
import { get } from "http";
import path from "node:path";
const directory = "static/images";
const __dirname = import.meta.dirname;

const { sort } = config;

/**
 * Reads files from the specified directory and gathers metadata.
 * 
 * @async
 * @function readFiles
 * @returns {Promise<Array<{file: string, meta: {path: string, birthtime: Date}}>>} A promise that resolves to an array of image objects with metadata.
 */
const readFiles = async () => {
    const images = [];
    try {
        const files = await fs.readdir(directory);
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try {
                const stats = await fs.stat(`${directory}/${file}`);
                if (stats.isFile()) {
                    images.push({
                        file: file,
                        meta: {
                            path: `${directory}/${file}`,
                            birthtime: stats.birthtime,
                        },
                    });
                }
            } catch (err) {
                console.error(err);
            }
        }
    } catch (err) {
        console.error(err);
    }
    return images;
};

/**
 * Retrieves and sorts images based on the specified sorting order.
 * 
 * @async
 * @function getImages
 * @returns {Promise<Array<{file: string, meta: {path: string, birthtime: Date}}>>} A promise that resolves to an array of sorted image objects with metadata.
 */
const getImages = async () => {
    const discoveredImagesFile = await fs.readFile(path.resolve(__dirname, "../../.cache/discovered-images.json"), "utf-8");
    const discoveredImages = JSON.parse(discoveredImagesFile);
    let images = await readFiles();

    if (sort === "asc") {
        images = images.sort((a, b) => {
            return a.meta.birthtime - b.meta.birthtime;
        });
    } else if (sort === "desc") {
        images = images.sort((a, b) => {
            return b.meta.birthtime - a.meta.birthtime;
        });
    }

    let newImagesBoolean = false;
    // Check if any new images have been added and console log a message
    images.forEach((image) => {
        const found = discoveredImages.find((discoveredImage) => discoveredImage.file === image.file);
        if (!found) {
            newImagesBoolean = true;
            console.log(`New image discovered: ${image.file}`);
        }
    });

    if (!newImagesBoolean && discoveredImages.length === images.length) {
        console.log("No new images discovered.");
    } else {
        console.log("New images discovered. Writing to cache.");
    try {
        await fs.mkdir(path.resolve(__dirname, "../../.cache"), { recursive: true });
        await fs.writeFile(path.resolve(__dirname, "../../.cache/discovered-images.json"), JSON.stringify(images, null, 2));
    } catch (err) {
        console.error(err);
    }
}


    return images;
};

getImages();

export default getImages;