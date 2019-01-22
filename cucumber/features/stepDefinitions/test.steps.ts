import { Given, When, Then, After } from "cucumber";
import { async } from "q";
import { browser, element, by } from "protractor";
import { expect } from "chai";
import { BestsellersHomepage } from "../../pageObjects/bestsellersHomepage";
import { HttpClient } from "protractor-http-client";
import { FactoryBot } from "../support/factories/bookListFactory";
import {Book } from "../support/models/book";
import {BookList } from "../support/models/bookList";

const http = new HttpClient("http://localhost:8080");
let home = new BestsellersHomepage();
let books: Array<Book>;

Given("I navigate to the Bestsellers home page", async () => {
  await browser.get("http://localhost:4200");
});

Then("I should see the app title", async () => {
  await home.title.getText().then(result => {
    expect(result).to.equal("New York Times Bestsellers");
  });
});

Given("a list of hardcover fiction book exists", async () => {  
  let bookList: BookList = FactoryBot.build('bookList');
  books = bookList.books;
  http.post("/__admin/mappings", {
    "request": {
      "method": "GET",
      "urlPath": "/books/genre/hardcover-fiction"
    },
    "response": {
      "status": 200,
      "body": JSON.stringify(books),
      "headers": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }
  });
});

When("I choose to view the Hardcover Fiction list", async () => {
  await browser.get("http://localhost:4200");
  await element
    .all(by.tagName("option"))
    .get(3)
    .click();
});

Then("I should see the list of Hardcover Fiction books", async () => {
  let expectedTitles: Array<String> = books.map(book => book.title);
  await home.bookTitles.getText().then(actualTitles => {
    expect(actualTitles).to.eql(expectedTitles);
  });
});