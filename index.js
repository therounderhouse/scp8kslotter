"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_1 = require("puppeteer");
function isNumeric(num) {
    return !isNaN(num);
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    function proposalCase() {
        return "001 Proposal";
    }
    function numericCase(str) {
        if (!usedSlots.has(str)) {
            usedSlots.add(str);
            return str;
        }
    }
    function algorithmicCase(str) {
        var slotCycler = str.substr(1, 4);
        if (str.charAt(0) == '<') {
            var y = 0;
            var limit = 9;
            if (str.substr(6, 5) == 'up to') {
                limit = str.charAt(str.length - 1);
            }
            var alterPoint = slotCycler.indexOf("X");
            do {
                slotCycler = slotCycler.substr(0, alterPoint) + y.toString() + slotCycler.substr(alterPoint + 1);
                y++;
                if (!usedSlots.has(slotCycler)) {
                    break;
                }
            } while (y <= limit);
            if (!usedSlots.has(slotCycler)) {
                usedSlots.add(slotCycler);
                return slotCycler;
            }
        }
        if (str.charAt(0) == '>') {
            var y = 9;
            var limit = 0;
            if (str.substr(6, 5) == 'down to') {
                limit = str.charAt(str.length - 1);
            }
            var alterPoint = slotCycler.indexOf("X");
            do {
                slotCycler = slotCycler.substr(0, alterPoint) + y.toString() + slotCycler.substr(alterPoint + 1);
                y--;
                if (!usedSlots.has(slotCycler)) {
                    break;
                }
            } while (y >= limit);
            if (!usedSlots.has(slotCycler)) {
                usedSlots.add(slotCycler);
                return slotCycler;
            }
        }
    }
    var browser, rounderpage, links, titles, authors, i, entryArray, entryPage, tempArray, currentEntry, fs, d, mdWrite, lowestUnoccupied, usedSlots, index, pick;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, puppeteer_1.default.launch( /*{headless: false}*/)];
            case 1:
                browser = _e.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                rounderpage = _e.sent();
                return [4 /*yield*/, rounderpage.goto('https://scp-wiki.wikidot.com/rounderhouse-s-author-page')];
            case 3:
                _e.sent();
                return [4 /*yield*/, rounderpage.setViewport({ width: 1080, height: 1024 })];
            case 4:
                _e.sent();
                return [4 /*yield*/, rounderpage.evaluate(function () {
                        var links = Array.from(document.querySelectorAll('tbody tr td:nth-child(2) a'));
                        return links.map(function (td) { return td.getAttribute('href'); });
                    })];
            case 5:
                links = _e.sent();
                return [4 /*yield*/, rounderpage.evaluate(function () {
                        var titles = Array.from(document.querySelectorAll('tbody tr td:nth-child(2)'));
                        return titles.map(function (td) { return td.textContent; });
                    })];
            case 6:
                titles = _e.sent();
                return [4 /*yield*/, rounderpage.evaluate(function () {
                        var authors = Array.from(document.querySelectorAll('tbody tr td:nth-child(3)'));
                        return authors.map(function (td) { return td.textContent; });
                    })];
            case 7:
                authors = _e.sent();
                i = 0;
                entryArray = [];
                _e.label = 8;
            case 8:
                if (!(i < 25)) return [3 /*break*/, 15];
                return [4 /*yield*/, browser.newPage()];
            case 9:
                entryPage = _e.sent();
                return [4 /*yield*/, entryPage.goto("https://scp-wiki.wikidot.com" + links[i])];
            case 10:
                _e.sent();
                return [4 /*yield*/, entryPage.waitForSelector('#discuss-button')];
            case 11:
                _e.sent();
                return [4 /*yield*/, entryPage.click('#discuss-button')];
            case 12:
                _e.sent();
                return [4 /*yield*/, entryPage.$$eval('.long .slots ol li', function (tempArray) {
                        return tempArray.map(function (td) { return td.textContent; });
                    })];
            case 13:
                tempArray = _e.sent();
                return [4 /*yield*/, entryPage.close()];
            case 14:
                _e.sent();
                console.log("Building entry #" + i);
                currentEntry = { title: titles[i], author: authors[i], slug: links[i], slotChoices: tempArray, finalSlot: null };
                entryArray.push(currentEntry);
                i++;
                return [3 /*break*/, 8];
            case 15: return [4 /*yield*/, browser.close()];
            case 16:
                _e.sent();
                fs = require('fs');
                fs.open('readme.md', 'w', function (err, file) {
                    if (err)
                        throw err;
                });
                fs.writeFile('readme.md', '', function (err) { if (err) {
                    console.log(err);
                } });
                // Assign winner 8000; congrats!
                entryArray[0].finalSlot = 8000;
                d = new Date();
                console.log("FINAL 8KCON SLOTS - (PROBABLY) ACCURATE TO " + d);
                console.log("SCP-" + entryArray[0].finalSlot + " —— " + ((_a = entryArray[0].title) === null || _a === void 0 ? void 0 : _a.substring(11)) + " by " + entryArray[0].author + " [Winner Winner Chicken Dinner]");
                mdWrite = ("# FINAL " + i + " 8KCON SLOTS - (PROBABLY) ACCURATE TO " + d + "\n ### Rerun every day by ROUNDERHOUSE, will get longer as more author posts are standardized.\n");
                fs.appendFile('readme.md', mdWrite, function (err) { if (err) {
                    console.log(err);
                } });
                mdWrite = ("I'll be abusing my mod powers to edit everyone's author posts but if you'd like to save me the trouble feel free. Just slap your entries into the following format in your author post; these are example values:\n> [[div class=\"slots\"]]\n> # 8069\n> # 8420\n> # >80X0\n> [[/div]]\nThat last one is an example of an algorithmic choice for the lowest 80X0 value -- the > signifies the lowest, the X is the variable you can stick wherever. You can also do >80X0 for the *highest* 80X0 value.");
                fs.appendFile('readme.md', mdWrite, function (err) { if (err) {
                    console.log(err);
                } });
                mdWrite = ("* SCP-" + entryArray[0].finalSlot + " —— " + ((_b = entryArray[0].title) === null || _b === void 0 ? void 0 : _b.substring(11)) + " **[Winner Winner Chicken Dinner]**\n");
                fs.appendFile('readme.md', mdWrite, function (err) { if (err) {
                    console.log(err);
                } });
                lowestUnoccupied = 8001;
                usedSlots = new Set();
                usedSlots.add("8000");
                // Start in second place, iterate through the array
                for (index = 1; index < entryArray.length; index++) {
                    for (pick = 0; pick < entryArray[index].slotChoices.length; pick++) {
                        // 001 case
                        if (entryArray[index].slotChoices[pick] == "001") {
                            entryArray[index].finalSlot = proposalCase();
                            if (entryArray[index].finalSlot != undefined) {
                                break;
                            }
                        }
                        // Numeric case
                        else if (isNumeric(entryArray[index].slotChoices[pick]) && entryArray[index].slotChoices[pick] != "001") {
                            entryArray[index].finalSlot = numericCase(entryArray[index].slotChoices[pick]);
                            if (entryArray[index].finalSlot != undefined) {
                                break;
                            }
                        }
                        // Algorithmic case
                        else if (entryArray[index].slotChoices[pick].charAt(0) == '<' || entryArray[index].slotChoices[pick].charAt(0) == '>') {
                            entryArray[index].finalSlot = algorithmicCase(entryArray[index].slotChoices[pick]);
                            if (entryArray[index].finalSlot != undefined) {
                                break;
                            }
                        }
                        // Fallback -- lowest unoccupied case
                        else {
                            if (usedSlots.has(lowestUnoccupied)) {
                                lowestUnoccupied++;
                            }
                            entryArray[index].finalSlot = lowestUnoccupied.toString();
                            if (entryArray[index].finalSlot != undefined) {
                                break;
                            }
                        }
                    }
                    console.log("SCP-" + entryArray[index].finalSlot + " —— " + ((_c = entryArray[index].title) === null || _c === void 0 ? void 0 : _c.substring(11)) + " by " + entryArray[index].author);
                    mdWrite = ("* SCP-" + entryArray[index].finalSlot + " —— " + ((_d = entryArray[index].title) === null || _d === void 0 ? void 0 : _d.substring(11)) + " by " + entryArray[index].author + "\n");
                    fs.appendFile('readme.md', mdWrite, function (err) { if (err) {
                        console.log(err);
                    } });
                }
                return [2 /*return*/];
        }
    });
}); })();
