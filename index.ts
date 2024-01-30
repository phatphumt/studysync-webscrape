import { constants } from "bun:sqlite";
import { load } from "cheerio";
import { uid } from "uid";

type Content = {
  url: string;
  content: string;
};

async function getUrls(searchTerms: string) {
  try {
    const response = await fetch(
      `https://www.google.com/search?q=${searchTerms}+-filetype:pdf `
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

async function getContent(url: string) {
  try {
    const response = await fetch(`https://www.google.com${url}`);

    const html = await response.text();

    const $ = load(html);
    const tags = $("p").toString();

    return tags;
  } catch (error) {
    throw error;
  }
}

async function getAllContent(arr: string[]) {
  arr.splice(0, 1);
  let newArr = [];
  for (const i of arr) {
    console.log(i);
    const data = await getContent(i);
    if (data) {
      newArr.push(data.replace(/(<([^>]+)>)/gi, ""));
    }
  }
  return newArr;
}

let searchTerms: string = "การแยกสาร";
// for await (const chunk of Bun.stdin.stream()) {
//   // chunk is Uint8Array
//   // this converts it to text (assumes ASCII encoding)
//   const chunkText = Buffer.from(chunk).toString();
//   searchTerms = chunkText;
//   break;
// }

const a = searchTerms.split(" ").join("+");
console.log(a);

/* extract the urls */
const stuff = await getUrls(a);
let actualURL: string[] = [];
stuff.forEach((e) => {
  const urlRegex = /\/url\?q=/g;
  const googleRegx = /^\/url\?q=https:\/\/(.*\.)?google\.com(\/[^&]+)?(&.*)?$/;

  if (!urlRegex.test(e) || googleRegx.test(e)) {
    return;
  }
  actualURL.push(e);
});
const id = uid(4);
actualURL.splice(0, 1);

/* TODO: getting the content */
let content: any[] = [];

const b = await getAllContent(actualURL);
Bun.write(`./results/content${id}.txt`, b.join("\n"));
