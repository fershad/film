# Film photo gallery website

A website for the photos I shoot on film cameras. Visit [https://film.fershad.com](https://film.fershad.com).

_This readme is incomplete, and for my own personal reference for now._ I hope to pull out parts of this project into a nice 11ty Starter repo later.

## Adding photos

1. Copy original photos into the `static/images` folder.
2. Run the command `npm run pokeball`. This will find all newly added photos (at least those which don't exist in the `_cache/discovered-images.json` file).
   1. You can add an argument to this command if you want to limit the number of images found (useful for large image dumps). E.g. `npm run pokeball 5` will limit the discovery to five new images.
3. Answer the prompts to create metadata for the image.
4. Once complete, commit to git.
5. Push to `main` to trigger a site build.
