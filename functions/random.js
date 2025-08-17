export async function onRequestGet(context) {
  const all = await fetch("https://film.fershad.com/all.json").then((res) =>
    res.json(),
  );

  const random = all.images[Math.floor(Math.random() * all.images.length)];

  const randomUrl = random.url;

  const randomPage = await fetch(randomUrl);

  return new Response(randomPage.body, randomPage);
}
