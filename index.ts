import axios from "axios";
import { load } from "cheerio";
import { uid } from "uid";

const fetchTitles = async () => {
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

const stuff = await fetchTitles();
Bun.write(`./results/results-${uid(4)}.txt`, stuff.join("\n"));
