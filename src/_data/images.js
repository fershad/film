const directory = 'static/images';
import fs from 'fs';

const getImages = async () => {

const images = [];
fs.readdir(directory, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    files.forEach(file => {
        images.push(file);
    });
});

return images;
}

export default getImages;