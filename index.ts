import puppeteer from 'puppeteer';

interface Entry {
  title: string;
  author: string;
  slug: string;
  slotChoices: [];
  finalSlot: Number;
}

(async () => {
  // Open ROUNDERPAGE in a puppeteer browser

    const browser = await puppeteer.launch(/*{headless: false}*/);
    const rounderpage = await browser.newPage();
  
    await rounderpage.goto('https://scp-wiki.wikidot.com/rounderhouse-s-author-page');
  
    await rounderpage.setViewport({width: 1080, height: 1024});

    // iterate through table and form arrays of titles, links, and authors

    const links = await rounderpage.evaluate(() => {
      const links = Array.from(document.querySelectorAll('tbody tr td:nth-child(2) a'))
      return links.map(td => td.getAttribute('href'))
    });

    const titles = await rounderpage.evaluate(() => {
      const titles = Array.from(document.querySelectorAll('tbody tr td:nth-child(2)'))
      return titles.map(td => td.textContent)
    });

    const authors = await rounderpage.evaluate(() => {
      const authors = Array.from(document.querySelectorAll('tbody tr td:nth-child(3)'))
      return authors.map(td => td.textContent)
    });

    // Create array of Entry objects and fill it with the previous arrays

    let i = 0;
    let entryArray = [];
    while (i < 6) {
      // console.log("#" + (i+1) + ": " + titles[i] + " by " + authors[i] + " (" + links[i] + ")")
      
      let entryPage = await browser.newPage();
      await entryPage.goto("https://scp-wiki.wikidot.com" + links[i])
      await entryPage.waitForSelector('#discuss-button')
      await entryPage.click('#discuss-button')
      let tempArray = await entryPage.evaluate(() => {
        tempArray = Array.from(document.querySelectorAll('.long ol li'))
        return tempArray.map(td => td.textContent)
      });
      await entryPage.close();
      let currentEntry = {title: titles[i], author: authors[i], slug: links[i], slotChoices: tempArray, finalSlot: null}
      entryArray.push(currentEntry)
      console.log("run " + i)
      i++
    }
    console.log(entryArray[4].slotChoices[2])

    // Assign winner 8000; congrats!
    entryArray[0].finalSlot = 8000

    // Iterate through array of Entry objects and determine each one's finalSlot value
    let lowestUnoccupied = 8001
    // Start in second place, iterate through the array
    for (let index = 1; index < entryArray.length; index++) {

      for (let pick = 0; pick < entryArray[i].slotChoices.length; pick++) {
        entryArray[index].slotChoices[pick]
        // Simple number case
        if (parseInt(entryArray[index].slotChoices[pick]) == lowestUnoccupied) {
          lowestUnoccupied++
          entryArray[i].finalSlot = entryArray[index].slotChoices[pick]

        }

        // Lowest unoccupied slot case

        // Algorithmic case
      }
    }

    await browser.close();
  })();