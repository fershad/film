const directory = "static/images";
import fs from "fs/promises";

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

    return images;
};

export default getImages;