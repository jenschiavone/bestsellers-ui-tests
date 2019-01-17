import { Given, When, Then, After } from "cucumber";
import { async } from "q";
import { browser } from "protractor";
import { expect } from "chai";
import { AngularHomepage } from "../../pageObjects/angularHomepage";

let angularHomepage = new AngularHomepage();

Given("I navigate to the Angular home page", async () => {
  await browser.get("https://angular.io/");
});

Then("the {string} button should be present", async button => {
  await angularHomepage.getStartedButton.getText().then(result => {
      console.log(result);
    expect(result).to.equal(button);
  });
});
