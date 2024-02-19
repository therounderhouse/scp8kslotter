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
    var browser, rounderpage, links, titles, authors, i, entryArray, entryPage, tempArray, currentEntry, d, lowestUnoccupied, usedSlots, index, pick, slotCycler, y, alterPoint, slotCycler, y, alterPoint;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, puppeteer_1.default.launch( /*{headless: false}*/)];
            case 1:
                browser = _c.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                rounderpage = _c.sent();
                return [4 /*yield*/, rounderpage.goto('https://scp-wiki.wikidot.com/rounderhouse-s-author-page')];
            case 3:
                _c.sent();
                return [4 /*yield*/, rounderpage.setViewport({ width: 1080, height: 1024 })];
            case 4:
                _c.sent();
                return [4 /*yield*/, rounderpage.evaluate(function () {
                        var links = Array.from(document.querySelectorAll('tbody tr td:nth-child(2) a'));
                        return links.map(function (td) { return td.getAttribute('href'); });
                    })];
            case 5:
                links = _c.sent();
                return [4 /*yield*/, rounderpage.evaluate(function () {
                        var titles = Array.from(document.querySelectorAll('tbody tr td:nth-child(2)'));
                        return titles.map(function (td) { return td.textContent; });
                    })];
            case 6:
                titles = _c.sent();
                return [4 /*yield*/, rounderpage.evaluate(function () {
                        var authors = Array.from(document.querySelectorAll('tbody tr td:nth-child(3)'));
                        return authors.map(function (td) { return td.textContent; });
                    })];
            case 7:
                authors = _c.sent();
                i = 0;
                entryArray = [];
                _c.label = 8;
            case 8:
                if (!(i < 7)) return [3 /*break*/, 15];
                return [4 /*yield*/, browser.newPage()];
            case 9:
                entryPage = _c.sent();
                return [4 /*yield*/, entryPage.goto("https://scp-wiki.wikidot.com" + links[i])];
            case 10:
                _c.sent();
                return [4 /*yield*/, entryPage.waitForSelector('#discuss-button')];
            case 11:
                _c.sent();
                return [4 /*yield*/, entryPage.click('#discuss-button')];
            case 12:
                _c.sent();
                return [4 /*yield*/, entryPage.$$eval('.long .slots ol li', function (tempArray) {
                        return tempArray.map(function (td) { return td.textContent; });
                    })];
            case 13:
                tempArray = _c.sent();
                return [4 /*yield*/, entryPage.close()];
            case 14:
                _c.sent();
                currentEntry = { title: titles[i], author: authors[i], slug: links[i], slotChoices: tempArray, finalSlot: null };
                entryArray.push(currentEntry);
                i++;
                return [3 /*break*/, 8];
            case 15:
                // Assign winner 8000; congrats!
                entryArray[0].finalSlot = 8000;
                d = new Date();
                console.log("FINAL 8KCON SLOTS - (PROBABLY) ACCURATE TO " + d);
                console.log("SCP-" + entryArray[0].finalSlot + " —— " + ((_a = entryArray[0].title) === null || _a === void 0 ? void 0 : _a.substring(11)) + " [Winner Winner Chicken Dinner]");
                lowestUnoccupied = 8001;
                usedSlots = new Set();
                usedSlots.add("8000");
                // Start in second place, iterate through the array
                for (index = 1; index < entryArray.length; index++) {
                    for (pick = 0; pick < entryArray[index].slotChoices.length; pick++) {
                        if (entryArray[index].slotChoices[pick] == "001") {
                            entryArray[index].finalSlot = "001";
                            break;
                        }
                        // Simple number case
                        else if (isNumeric(entryArray[index].slotChoices[pick]) || entryArray[index].slotChoices[pick] != "001") {
                            if (!usedSlots.has(entryArray[index].slotChoices[pick])) {
                                entryArray[index].finalSlot = entryArray[index].slotChoices[pick];
                                usedSlots.add(entryArray[index].slotChoices[pick]);
                                break;
                            }
                        }
                        // Algorithmic case
                        else if (entryArray[index].slotChoices[pick].charAt(0) == '<' || entryArray[index].slotChoices[pick].charAt(0) == '>') {
                            if (entryArray[index].slotChoices[pick].charAt(0) == '<') {
                                slotCycler = entryArray[index].slotChoices[pick].substr(1, entryArray[index].slotChoices[pick].length);
                                y = 0;
                                alterPoint = slotCycler.indexOf("X");
                                do {
                                    slotCycler = slotCycler.substr(0, alterPoint) + y.toString() + slotCycler.substr(alterPoint + 1);
                                    y++;
                                    if (!usedSlots.has(slotCycler)) {
                                        break;
                                    }
                                } while (y < 10);
                                if (!usedSlots.has(slotCycler)) {
                                    entryArray[index].finalSlot = slotCycler;
                                    usedSlots.add(slotCycler);
                                    break;
                                }
                            }
                            if (entryArray[index].slotChoices[pick].charAt(0) == '>') {
                                slotCycler = entryArray[index].slotChoices[pick].substr(1, entryArray[index].slotChoices[pick].length);
                                y = 9;
                                alterPoint = slotCycler.indexOf("X");
                                do {
                                    slotCycler = slotCycler.substr(0, alterPoint) + y.toString() + slotCycler.substr(alterPoint + 1);
                                    y--;
                                    if (!usedSlots.has(slotCycler)) {
                                        break;
                                    }
                                } while (y <= 0);
                                if (!usedSlots.has(slotCycler)) {
                                    entryArray[index].finalSlot = slotCycler;
                                    usedSlots.add(slotCycler);
                                    break;
                                }
                            }
                        }
                        else {
                            if (usedSlots.has(lowestUnoccupied)) {
                                lowestUnoccupied++;
                            }
                            entryArray[index].finalSlot = lowestUnoccupied.toString();
                        }
                    }
                    console.log("SCP-" + entryArray[index].finalSlot + " —— " + ((_b = entryArray[index].title) === null || _b === void 0 ? void 0 : _b.substring(11)));
                }
                return [4 /*yield*/, browser.close()];
            case 16:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); })();
