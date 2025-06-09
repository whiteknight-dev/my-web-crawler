import axios from "axios";
import * as cheerio from "cheerio";

async function crawlPage(url) {
  try {
    const res = await axios.get(url);
    const htmlContent = res.data;

    const extractedLinks = parseHTML(htmlContent);

    console.log(`Enlaces encontrados en ${url}:`);
    extractedLinks.forEach((link) => {
      console.log(
        `- Texto: "<span class="math-inline">${link.text}", URL\: "</span>${link.href}"`
      );
    });

    return extractedLinks;
  } catch (error) {
    if (error.response) {
      console.error(
        `Fail to crawl ${url}: Code Status ${error.response.status}`
      );
    } else if (error.request) {
      console.error(`Fail to crawl ${url}: Fail Server Connection.`);
    } else {
      console.error(`Fail to crawl ${url}: ${error.message}`);
    }
    return null;
  }
}

function parseHTML(htmlContent) {
  const $ = cheerio.load(htmlContent);
  const linksList = $("a");
  const extractedLinks = [];

  linksList.each((index, element) => {
    const href = $(element).attr("href");
    const text = $(element).text().trim();

    if (href) extractedLinks.push({ text, href });
  });

  return extractedLinks;
}

const TEST_URL = "";
crawlPage(TEST_URL);
