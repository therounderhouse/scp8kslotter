import puppeteer from 'puppeteer';
import * as fs from 'node:fs';

type Optional<T> = T | null

interface Entry {
  title: Optional<string>;
  author: Optional<string>;
  slug: Optional<string>;
  slotChoices: any;
  finalSlot: any;
}

function isNumeric(num){
  return !isNaN(num)
}


(async () => {

  function proposalCase() {
    return "001 Proposal"
  }
  
  function numericCase(str) {
    if(!usedSlots.has(str)) {
      usedSlots.add(str)
      return str
    }
  }

  function algorithmicCase(str) {

    let slotCycler = str.substr(1,4)

    if (str.charAt(0) == '<') {
      let y = 0;
      let limit = 9;
      if (str.substr(6,5) == 'up to') { limit = str.charAt(str.length - 1)}
      let alterPoint = slotCycler.indexOf("X");
      do {
          slotCycler = slotCycler.substr(0, alterPoint) + y.toString() + slotCycler.substr(alterPoint + 1);
          y++;
          if(!usedSlots.has(slotCycler)) {
            break;
          }
      } while (y <= limit);
      
      if (!usedSlots.has(slotCycler)) {
        usedSlots.add(slotCycler)
        return slotCycler;
      }
    }
    if (str.charAt(0) == '>') {
      let y = 9
      let limit = 0;
      if (str.substr(6,5) == 'down to') { limit = str.charAt(str.length - 1)}
      let alterPoint = slotCycler.indexOf("X");
      do {
          slotCycler = slotCycler.substr(0, alterPoint) + y.toString() + slotCycler.substr(alterPoint + 1);
          y--;
          if(!usedSlots.has(slotCycler)) {
            break;
          }
      } while (y >= limit);
      
      
      if (!usedSlots.has(slotCycler)) {
        usedSlots.add(slotCycler)
        return slotCycler;
      }
    }
  }

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
    while (i < 25) {
      let entryPage = await browser.newPage();
      await entryPage.goto("https://scp-wiki.wikidot.com" + links[i])
      await entryPage.waitForSelector('#discuss-button')
      await entryPage.click('#discuss-button')
      let tempArray = await entryPage.$$eval('.long .slots ol li', tempArray => {
        return tempArray.map(td => td.textContent);
      });
      await entryPage.close();
      console.log("Building entry #" + i)
      let currentEntry: Entry = {title: titles[i], author: authors[i], slug: links[i], slotChoices: tempArray, finalSlot: null}
      entryArray.push(currentEntry)
      i++
    }

    await browser.close();

    let fs = require('fs');
    fs.open('readme.md', 'w', function (err, file) {
      if (err) throw err;
    }); 
    fs.writeFile('readme.md', '', function(err){if (err) { console.log(err); } })

    // Assign winner 8000; congrats!
    entryArray[0].finalSlot = 8000
    
    const d = new Date();
    console.log("FINAL 8KCON SLOTS - (PROBABLY) ACCURATE TO " + d)
    console.log("SCP-" +  entryArray[0].finalSlot + " —— " + entryArray[0].title?.substring(11) + " by " + entryArray[0].author + " [Winner Winner Chicken Dinner]")
    let mdWrite = ("# FINAL " + i + " 8KCON SLOTS - (PROBABLY) ACCURATE TO " + d + "\n ### Rerun every day by ROUNDERHOUSE, will get longer as more author posts are standardized.\n")
    fs.appendFile('readme.md', mdWrite, (err) => { if (err) { console.log(err); } }); 

    mdWrite = ("* SCP-" +  entryArray[0].finalSlot + " —— " + entryArray[0].title?.substring(11) + " **[Winner Winner Chicken Dinner]**\n")
    fs.appendFile('readme.md', mdWrite, (err) => { if (err) { console.log(err); } }); 
    // Iterate through array of Entry objects and determine each one's finalSlot value
    let lowestUnoccupied = 8001

    // Create set to track used slots
    const usedSlots = new Set();
    usedSlots.add("8000")

    // Start in second place, iterate through the array
    for (let index = 1; index < entryArray.length; index++) {


      for (let pick = 0; pick < entryArray[index].slotChoices.length; pick++) {
        
        // 001 case
        if (entryArray[index].slotChoices[pick] == "001") {
          entryArray[index].finalSlot = proposalCase()
          if (entryArray[index].finalSlot != undefined) {break}
        }

        // Numeric case

        else if (isNumeric(entryArray[index].slotChoices[pick]) && entryArray[index].slotChoices[pick] != "001") {
          entryArray[index].finalSlot = numericCase(entryArray[index].slotChoices[pick])
          if (entryArray[index].finalSlot != undefined) {break}
        } 

        // Algorithmic case

        else if (entryArray[index].slotChoices[pick].charAt(0) == '<' || entryArray[index].slotChoices[pick].charAt(0) == '>' ) {
          entryArray[index].finalSlot = algorithmicCase(entryArray[index].slotChoices[pick])
          if (entryArray[index].finalSlot != undefined) {break}
        }

        // Fallback -- lowest unoccupied case
        else {
          if(usedSlots.has(lowestUnoccupied)) {
            lowestUnoccupied++
          }
          entryArray[index].finalSlot = lowestUnoccupied.toString()
          if (entryArray[index].finalSlot != undefined) {break}
        }
      }
      console.log("SCP-" +  entryArray[index].finalSlot + " —— " + entryArray[index].title?.substring(11) + " by " + entryArray[index].author)
      mdWrite = ("* SCP-" +  entryArray[index].finalSlot + " —— " + entryArray[index].title?.substring(11) + " by " + entryArray[index].author + "\n")
      fs.appendFile('readme.md', mdWrite, (err) => { if (err) { console.log(err); } }); 
    }

  })();