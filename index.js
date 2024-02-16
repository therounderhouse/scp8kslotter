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
    var browser, rounderpage, links, titles, authors, i, entryArray, _loop_1, lowestUnoccupied, usedSlots, index, pick, slotCycler, y, alterPoint;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer_1.default.launch( /*{headless: false}*/)];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                rounderpage = _a.sent();
                return [4 /*yield*/, rounderpage.goto('https://scp-wiki.wikidot.com/rounderhouse-s-author-page')];
            case 3:
                _a.sent();
                return [4 /*yield*/, rounderpage.setViewport({ width: 1080, height: 1024 })];
            case 4:
                _a.sent();
                return [4 /*yield*/, rounderpage.evaluate(function () {
                        var links = Array.from(document.querySelectorAll('tbody tr td:nth-child(2) a'));
                        return links.map(function (td) { return td.getAttribute('href'); });
                    })];
            case 5:
                links = _a.sent();
                return [4 /*yield*/, rounderpage.evaluate(function () {
                        var titles = Array.from(document.querySelectorAll('tbody tr td:nth-child(2)'));
                        return titles.map(function (td) { return td.textContent; });
                    })];
            case 6:
                titles = _a.sent();
                return [4 /*yield*/, rounderpage.evaluate(function () {
                        var authors = Array.from(document.querySelectorAll('tbody tr td:nth-child(3)'));
                        return authors.map(function (td) { return td.textContent; });
                    })];
            case 7:
                authors = _a.sent();
                i = 0;
                entryArray = [];
                _loop_1 = function () {
                    var entryPage, tempArray, currentEntry;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, browser.newPage()];
                            case 1:
                                entryPage = _b.sent();
                                return [4 /*yield*/, entryPage.goto("https://scp-wiki.wikidot.com" + links[i])];
                            case 2:
                                _b.sent();
                                return [4 /*yield*/, entryPage.waitForSelector('#discuss-button')];
                            case 3:
                                _b.sent();
                                return [4 /*yield*/, entryPage.click('#discuss-button')];
                            case 4:
                                _b.sent();
                                return [4 /*yield*/, entryPage.evaluate(function () {
                                        tempArray = Array.from(document.querySelectorAll('.long ol li'));
                                        return tempArray.map(function (td) { return td.textContent; });
                                    })];
                            case 5:
                                tempArray = _b.sent();
                                return [4 /*yield*/, entryPage.close()];
                            case 6:
                                _b.sent();
                                currentEntry = { title: titles[i], author: authors[i], slug: links[i], slotChoices: ["8999", "8001", "8888", "<8x00"], finalSlot: NaN };
                                entryArray.push(currentEntry);
                                console.log("Building entry " + (i + 1));
                                i++;
                                return [2 /*return*/];
                        }
                    });
                };
                _a.label = 8;
            case 8:
                if (!(i < 6)) return [3 /*break*/, 10];
                return [5 /*yield**/, _loop_1()];
            case 9:
                _a.sent();
                return [3 /*break*/, 8];
            case 10:
                // Assign winner 8000; congrats!
                entryArray[0].finalSlot = 8000;
                lowestUnoccupied = 8001;
                usedSlots = new Set();
                usedSlots.add("8000");
                // Start in second place, iterate through the array
                for (index = 1; index < entryArray.length; index++) {
                    //console.log(entryArray[index].title + "'s slot choices:")
                    for (pick = 0; pick < entryArray[index].slotChoices.length; pick++) {
                        //console.log(entryArray[index].slotChoices[pick])
                        // Simple number case
                        if (isNumeric(entryArray[index].slotChoices[pick])) {
                            if (!usedSlots.has(entryArray[index].slotChoices[pick])) {
                                entryArray[index].finalSlot = entryArray[index].slotChoices[pick];
                                usedSlots.add(entryArray[index].slotChoices[pick]);
                                break;
                            }
                            // console.log (entryArray[index].slotChoices[pick] + " Is a Number")
                        }
                        // Algorithmic case
                        else if (entryArray[index].slotChoices[pick].charAt(0) == '<' || entryArray[index].slotChoices[pick].charAt(0) == '>') {
                            console.log("algorithmic case " + entryArray[index].slotChoices[pick]);
                            if (entryArray[index].slotChoices[pick].charAt(0) == '<') {
                                slotCycler = entryArray[index].slotChoices[pick].substr(1, entryArray[index].slotChoices[pick].length);
                                y = 0;
                                alterPoint = slotCycler.indexOf("x");
                                do {
                                    console.log(slotCycler.substr(0, alterPoint));
                                    console.log(y.toString());
                                    console.log(slotCycler.substr(alterPoint + 1));
                                    slotCycler = slotCycler.substr(0, alterPoint) + y.toString() + slotCycler.substr(alterPoint + 1);
                                    console.log("testing slot " + slotCycler);
                                    y++;
                                } while (!usedSlots.has(slotCycler) || y < 2);
                                if (!usedSlots.has(slotCycler)) {
                                    entryArray[index].finalSlot = slotCycler;
                                    usedSlots.add(slotCycler);
                                    break;
                                }
                            }
                            if (entryArray[index].slotChoices[pick].charAt(0) == '>') {
                                // Highest case
                            }
                        }
                        // Lowest occupied slot case
                    }
                    console.log(entryArray[index].title + "'s final slot is: " + entryArray[index].finalSlot);
                }
                return [4 /*yield*/, browser.close()];
            case 11:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
