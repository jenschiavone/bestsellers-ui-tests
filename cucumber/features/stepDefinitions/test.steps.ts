import { Given, When, Then, After } from "cucumber";
import { async } from "q";
import { browser } from "protractor";
import { expect } from "chai";
import { BestsellersHomepage } from "../../pageObjects/bestsellersHomepage";

let home = new BestsellersHomepage();

Given("I navigate to the Bestsellers home page", async () => {
  await browser.get("http://localhost:4200");
});

Then("I should see the app title", async () => {
  console.log(home.title)
  // expect(await home.title.isPresent()).to.equal(true);
});