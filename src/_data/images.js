const directory = "static/images";
import fs from "fs/promises";
import path from "node:path";
const __dirname = import.meta.dirname;

/**
 * @constant {string} sort
 * @default 'asc'
 * @description Specifies the sorting order. Can be 'asc' for ascending or 'desc' for descending.
 */
const sort = 'asc';

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
    const discoveredImages = await fs.readFile(path.resolve(__dirname, "../../.cache/discovered-images.json"), "utf-8");
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
    
    // console.log(JSON.parse(discoveredImages));
    // Write the data to a JSON file called ../../.cache/discovered-images.json
    // Create the .cache directory if it doesn't exist
    const data = JSON.stringify(images, null, 4);
    try {
        await fs.mkdir(path.resolve(__dirname, "../../.cache"), { recursive: true });
        await fs.writeFile(path.resolve(__dirname, "../../.cache/discovered-images.json"), data);
    } catch (err) {
        console.error(err);
    }


    return images;
};

export default getImages;