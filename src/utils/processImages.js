import { config } from "./image.config.js";
import fs from "fs/promises";
import path from "node:path";
const directory = "static/images";
const __dirname = import.meta.dirname;
import cli from './cli.js';

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
    let limit = undefined;
    if (process.argv[2]) {
        limit = Number(process.argv[2]);
        console.log(`Limit set to ${limit}.`);
    } else {
        console.log("No limit set.");
    }

    const discoveredImagesFile = await fs.readFile(path.resolve(__dirname, "../../_cache/discovered-images.json"), "utf-8").catch(() => null);
    const discoveredImages = JSON.parse(discoveredImagesFile) || [];
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
    let newImagesCount = 0;

    for(let i = 0; i < images.length; i++) {
        const found = discoveredImages.find((discoveredImage) => discoveredImage.file === images[i].file);
        if (!found) {
            newImagesBoolean = true;
            console.log(`New image discovered: ${images[i].file}`);
            images[i].metadata = await cli(images[i].meta.path);
            newImagesCount++;
            if (limit && newImagesCount > limit) {
                // Remove any images that have not been processed
                images = images.slice(0, i+1);
                break;
            }
        } else {
            images[i].metadata = found.metadata;
        }
    }
        

    if (!newImagesBoolean && discoveredImages.length === images.length) {
        console.log("No new images discovered.");
    } else {
        console.log("New images discovered. Writing to cache.");
    try {
        await fs.mkdir(path.resolve(__dirname, "../../_cache"), { recursive: true });
        await fs.writeFile(path.resolve(__dirname, "../../_cache/discovered-images.json"), JSON.stringify(images, null, 2));
    } catch (err) {
        console.error(err);
    }
}


    return images;
};

getImages();

export default getImages;