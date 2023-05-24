const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto('https://www.windguru.cz/station/2748');
  await page.waitForTimeout(1000);
  await page.waitForSelector('.wgs_wind_avg_value')
  //await page.waitForFunction('document.getElementsByClassName("wgs_wind_avg_value")[0].childNodes[0].length > 0')
  const data = await page.evaluate(() => {
    return document.querySelector('.wgs_wind_avg_value').innerText;
  });
  //console.log(data);
  await browser.close();
  res.json({wind: data})
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
