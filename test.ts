import { load } from "cheerio";

async function getUrls(url: string) {
  try {
    const response = await fetch(`https://www.google.com/${url}`);

    const html = await response.text();

    const $ = load(html);
    const tags = $("p").toString();

    return [tags, html];
  } catch (error) {
    throw error;
  }
}

const [a, html] = await getUrls(
  "/url?q=https://pubhtml5.com/qrep/qyay/basic/151-200&sa=U&ved=2ahUKEwj_4er7gYWEAxWVSWwGHfkSBMoQFnoECAAQAg&usg=AOvVaw2RpkhTda3Dz_-w__qtaoo-"
);
console.log(a.replace(/(<([^>]+)>)/gi, "\n"));
