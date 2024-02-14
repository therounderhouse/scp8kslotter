import puppeteer from 'puppeteer';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const rounderpage = await browser.newPage();
  
    await rounderpage.goto('https://scp-wiki.wikidot.com/rounderhouse-s-author-page');
  
    await rounderpage.setViewport({width: 1080, height: 1024});
  
    const links = await rounderpage.evaluate(() => {
      const links = Array.from(document.querySelectorAll('tbody tr td:nth-child(2) a'))
      return links.map(td => td.getAttribute('href'))
    });

    const titles = await rounderpage.evaluate(() => {
      const titles = Array.from(document.querySelectorAll('tbody tr td:nth-child(2)'))
      return titles.map(td => td.innerText)
    });

    const authors = await rounderpage.evaluate(() => {
      const authors = Array.from(document.querySelectorAll('tbody tr td:nth-child(3)'))
      return authors.map(td => td.innerText)
    });

    let i = 0;
    while (i < links.length) {
      console.log("#" + (i+1) + ": " + titles[i] + " by " + authors[i] + " (" + links[i] + ")")
      i++;
    }

    const entryPage = await browser.newPage();
    await entryPage.goto("https://scp-wiki.wikidot.com" + links[0])
    await entryPage.waitForSelector('#discuss-button')
    await entryPage.click('#discuss-button')

    await browser.close();
  })();