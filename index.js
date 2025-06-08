import axios from "axios";

async function crawlPage(url) {
  try {
    const res = await axios.get(url);
    // const data = await res.json();

    console.log(res.data.substring(0, 500) + "...");
    return res.data;
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

const TEST_URL = "";
crawlPage(TEST_URL);
