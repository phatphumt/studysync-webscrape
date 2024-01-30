import { load } from "cheerio";
import { uid } from "uid";

const dfkljhkldfh = async () => {
  try {
    const response = await fetch(
      "https://www.google.com/search?q=what+is+anatomy"
    );

    const html = await response.text();

    const $ = load(html);
    const tags = $("a")
      .toArray()
      .map((e) => {
        return e.attribs.href;
      });

    return tags;
  } catch (error) {
    throw error;
  }
};

const stuff = await dfkljhkldfh();
let actualURL: string[] = []
stuff.forEach(e => {
  const a = e.match(/\/url\?q=/g)
  if (!a) {
    return
  }
  const regx = /^\/url\?q=https:\/\/(.*\.)?google\.com(\/[^&]+)?(&.*)?$/
  if (regx.test(e)) {
    return
  }
  actualURL.push(e)
})
const id = uid(4)
Bun.write(`./results/urlsss-${id}.txt`, actualURL.join('\n'))

// stuff.forEach(async (e) => {
//   const data = await fetch(`e)
//   const datata = await data.text()
//   const $ = load(datata)
//   const stuffs = $("body").toArray()
// })
