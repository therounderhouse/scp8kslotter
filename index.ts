import puppeteer from 'puppeteer';

type Optional<T> = T | null

interface Entry {
  title: Optional<string>;
  author: Optional<string>;
  slug: Optional<string>;
  slotChoices: any;
  finalSlot: number;
}

function isNumeric(num){
  return !isNaN(num)
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
    let entryArray: Entry[] = [];
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
      let currentEntry: Entry = {title: titles[i], author: authors[i], slug: links[i], slotChoices: ["8999", "8001", "8888", "<8x00"], finalSlot: NaN}
      entryArray.push(currentEntry)
      console.log("Building entry " + (i+1))
      i++
    }
    // Assign winner 8000; congrats!
    entryArray[0].finalSlot = 8000

    // Iterate through array of Entry objects and determine each one's finalSlot value
    let lowestUnoccupied = 8001

    // Create set to track used slots
    const usedSlots = new Set();
    usedSlots.add("8000")

    // Start in second place, iterate through the array
    for (let index = 1; index < entryArray.length; index++) {

      //console.log(entryArray[index].title + "'s slot choices:")

      for (let pick = 0; pick < entryArray[index].slotChoices.length; pick++) {
        //console.log(entryArray[index].slotChoices[pick])
        
        // Simple number case
        if (isNumeric(entryArray[index].slotChoices[pick])) {
          if(!usedSlots.has(entryArray[index].slotChoices[pick])) {
            entryArray[index].finalSlot = entryArray[index].slotChoices[pick]
            usedSlots.add(entryArray[index].slotChoices[pick])
            break;
          }
          // console.log (entryArray[index].slotChoices[pick] + " Is a Number")
        } 

        // Algorithmic case

        else if (entryArray[index].slotChoices[pick].charAt(0) == '<' || entryArray[index].slotChoices[pick].charAt(0) == '>' ) {
          console.log("algorithmic case " + entryArray[index].slotChoices[pick])
          if (entryArray[index].slotChoices[pick].charAt(0) == '<') {
            
            let slotCycler = entryArray[index].slotChoices[pick].substr(1,entryArray[index].slotChoices[pick].length)
            let y = 0;
            let alterPoint = slotCycler.indexOf("x")
            do {
              console.log(slotCycler.substr(0, alterPoint))
              console.log(y.toString())
              console.log(slotCycler.substr(alterPoint + 1))
              slotCycler = slotCycler.substr(0, alterPoint) + y.toString() + slotCycler.substr(alterPoint + 1)
              console.log("testing slot " + slotCycler)
              y++
            } while(!usedSlots.has(slotCycler) || y < 2)
            
            if (!usedSlots.has(slotCycler)) {
              entryArray[index].finalSlot = slotCycler;
              usedSlots.add(slotCycler)
              break;
            }

          }
          if (entryArray[index].slotChoices[pick].charAt(0) == '>') {
            // Highest case
          }
        }

        // Lowest occupied slot case
      }
      console.log(entryArray[index].title + "'s final slot is: " + entryArray[index].finalSlot)
    }

    await browser.close();
  })();