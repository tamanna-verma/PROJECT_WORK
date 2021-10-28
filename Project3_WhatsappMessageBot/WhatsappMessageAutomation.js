const puppeteer = require("puppeteer");

async function scrape(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector("span [title='Mommyyy♥️']");
  const target = await page.$("span [title='Mommyyy♥️']");
  await target.click();
  const inp = await page.$
   (
   "#main > footer > div._2BU3P.tm2tP.copyable-area > div > div > div._2lMWa > div.p3_M1 > div > div._13NKt.copyable-text.selectable-text"
   );


  for (let i = 0; i < 200; i++) {
    await inp.type("You are the world's best Mommyyyyy");
    await page.keyboard.press("Enter");
  }
}

scrape("https://web.whatsapp.com");