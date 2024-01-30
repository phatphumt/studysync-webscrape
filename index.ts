import { load } from "cheerio";
import { uid } from "uid";

type Content = {
  url: string;
  content: string[];
}

async function getUrls(searchTerms: string) {
  try {
    const response = await fetch(
      `https://www.google.com/search?q=${searchTerms}`
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
}

let searchTerms: string = ""
for await (const chunk of Bun.stdin.stream()) {
  // chunk is Uint8Array
  // this converts it to text (assumes ASCII encoding)
  const chunkText = Buffer.from(chunk).toString();
  searchTerms = chunkText
  break
}

const a = searchTerms.split(" ").join("+")
console.log(a)


/* extract the urls */ 
const stuff = await getUrls(a);
let actualURL: string[] = []
stuff.forEach(e => {
  const urlRegex = /\/url\?q=/g
  const googleRegx = /^\/url\?q=https:\/\/(.*\.)?google\.com(\/[^&]+)?(&.*)?$/

  if (!(urlRegex.test(e))) {
    return
  }
  if (googleRegx.test(e)) {
    return
  }
  actualURL.push(e)
})
const id = uid(4)
Bun.write(`./results/urlsss-${id}.txt`, actualURL.join('\n'))

/* TODO: getting the content */
