import { ElementFinder, element, by, browser } from "protractor";

export class AngularHomepage {
  getStartedButton: ElementFinder;

  constructor() {
    this.getStartedButton = element(by.css('.hero-cta'));
  }
}
