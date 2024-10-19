import fs from "fs/promises";
import path from "node:path";
const __dirname = import.meta.dirname;

const discoveredImagesFile = await fs.readFile(path.resolve(__dirname, "../../.cache/discovered-images.json"), "utf-8");
const discoveredImages = JSON.parse(discoveredImagesFile);

export default discoveredImages;