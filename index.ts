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


  function palindromeCase(str) {
    let palindromeCycler;
    if(str == 'lowest') {
      palindromeCycler = 8008;
      while(usedSlots.has(palindromeCycler.toString()) && palindromeCycler <= 8998) {
        palindromeCycler += 110;
      }

    }
    else if(str == 'highest') {
      palindromeCycler = 8998;
      while(usedSlots.has(palindromeCycler.toString()) && palindromeCycler >= 8008) {
        palindromeCycler -= 110;
      }
    }

    if (!usedSlots.has(palindromeCycler.toString())) {
      usedSlots.add(palindromeCycler.toString())
      return palindromeCycler.toString()
    }

  }

  function algorithmicCase(str) {

    if (str.substr(0,6) == 'Lowest') {
      if(str.substr(7, 10) == 'palindrome') {
        return palindromeCase('lowest')
      }
      let slotCycler = str.substr(7,4)
      let y = 0;
      let limit = 9;
      let alterPoint = slotCycler.indexOf("X");
      if (str.substr(12,5) == 'up to') { 
        let limitStr = str.charAt(str.length - 4)
        limit = parseInt(limitStr.charAt(alterPoint))
      }

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
    if (str.substr(0,7) == 'Highest') {
      if(str.substr(8, 10) == 'palindrome') {
        return palindromeCase('highest')
      }
      let slotCycler = str.substr(8,4)
      let y = 9
      let limit = 0;
      let alterPoint = slotCycler.indexOf("X");
      if (str.substr(13,7) == 'up to') { 
        let limitStr = str.charAt(str.length - 4)
        limit = parseInt(limitStr.charAt(alterPoint))
      }
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

    mdWrite = ("I'll be abusing my mod powers to edit everyone's author posts but if you'd like to save me the trouble feel free. Just slap your entries into the following format in your author post; these are example values:\n> [[div class=\"slots\"]]  \n> \\# 8069  \n> \\# 8420  \n> \\# Lowest palindrome  \n> \\# Lowest 80X0  \n> \\# Highest 8X00 down to 8700 \n> \\[[/div]]  \n The last two are an example of an algorithmic choice for the lowest 80X0 or highest 8X00 value -- the X is the variable you can stick wherever. You can also add the optional \"up to\" or \"down to\" phrasing, respectively, if you'd like to specify a limit.\n")
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

      // If the array is empty i.e. if no slots were listed, just assign it the lowest 
      if (entryArray[index].slotChoices.length == 0) {
        while (usedSlots.has(lowestUnoccupied.toString())) {
          lowestUnoccupied++
        }
        entryArray[index].finalSlot = lowestUnoccupied.toString()
      }

      // For all other cases
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

        // Algorithmic & palindrome case

        else if (entryArray[index].slotChoices[pick].substr(0, 6) == 'Lowest' || entryArray[index].slotChoices[pick].substr(0, 7) == 'Highest' ) {
          entryArray[index].finalSlot = algorithmicCase(entryArray[index].slotChoices[pick])
          if (entryArray[index].finalSlot != undefined) {break}
        }

        // Fallback -- lowest unoccupied case
        else {
          if(usedSlots.has(lowestUnoccupied.toString())) {
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