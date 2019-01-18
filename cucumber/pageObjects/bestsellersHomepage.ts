import { ElementFinder, element, by, browser } from "protractor";

export class BestsellersHomepage {
  title: ElementFinder;

  constructor() {
    this.title = element(by.css('a.navbar-brand'));
  }
}
