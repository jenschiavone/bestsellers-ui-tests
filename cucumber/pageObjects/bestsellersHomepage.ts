import { ElementFinder, ElementArrayFinder, element, by, browser } from "protractor";

export class BestsellersHomepage {
  title: ElementFinder;
  bookList: ElementFinder;
  bookTitles: ElementArrayFinder;


  constructor() {
    this.title = element(by.css('a.navbar-brand'));
    this.bookList = element(by.tagName('tbody'));
    this.bookTitles = element.all(by.tagName('tr td:nth-child(2)'));
  }
}