import { collections } from './collections.js';
import fs from 'fs';
import path from 'path';
const __dirname = import.meta.dirname;


// Export a function that updates the collections array in the file collections.js by reading a parameter from the command line
export const updateCollections = async () => {
    let collection = process.argv[2] || null;
    if (!collection) {
        console.error("Please provide a collection name.");
        return;
    }
  // Check if the collection already exists in the collections array
  if (collections.includes(collection)) {
    console.log(`Collection ${collection} already exists`);
    return;
  }

  // Add the new collection to the collections array
  collections.push(collection);

  const collectionsFilePath = path.resolve(__dirname, 'collections.js');
  const collectionsFileContent = `export const collections = ${JSON.stringify(collections, null, 2)};`;

  fs.writeFileSync(collectionsFilePath, collectionsFileContent);

  console.log(`Collection ${collection} added successfully`);
};

updateCollections()

export default updateCollections;