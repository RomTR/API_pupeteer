const puppeteer = require("puppeteer");
require("dotenv").config();

const maree = async (res) => {
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

    await page.goto('https://maree.info/136');
  await page.waitForTimeout(1000);
  await page.waitForSelector('.HauteursInfoFlag')
  
  //await page.waitForFunction('document.getElementsByClassName("wgs_wind_avg_value")[0].childNodes[0].length > 0')

const maree = await page.evaluate(() => {
    return document.querySelectorAll('.PMBM')[0].firstChild.innerText;;
});
const V1 = await page.evaluate(() => {
    return document.querySelectorAll('.SEPV > .HauteursInfoFlag')[0].innerText;
});
const V2 = await page.evaluate(() => {
    return document.querySelectorAll('.SEPV > .HauteursInfoFlag')[1].innerText;
});
const V3 = await page.evaluate(() => {
    return document.querySelectorAll('.SEPV > .HauteursInfoFlag')[2].innerText;
});
const V4 = await page.evaluate(() => {
    return document.querySelectorAll('.SEPV > .HauteursInfoFlag')[3].innerText;
});

const H1 = await page.evaluate(() => {
    return document.querySelectorAll('.SEPV > .HauteursInfoFlag')[4].innerText;
});
const H2 = await page.evaluate(() => {
    return document.querySelectorAll('.SEPV > .HauteursInfoFlag')[5].innerText;
});
const H3 = await page.evaluate(() => {
    return document.querySelectorAll('.SEPV > .HauteursInfoFlag')[6].innerText;
});
const H4 = await page.evaluate(() => {
    return document.querySelectorAll('.SEPV > .HauteursInfoFlag')[7].innerText;
});


  await browser.close();
  res.json({maree : maree,
            V1 : V1,
            V2 : V2,
            V3 : V3,
            V4 : V4,
            H1 : H1,
            H2 : H2,
            H3 : H3,
            H4 : H4, 
        })
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { maree };
