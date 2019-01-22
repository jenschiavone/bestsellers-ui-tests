import { FactoryBot } from "factory-bot-ts";
import { BookList } from "../models/bookList";
import { Book } from "../models/book";
import * as Faker from 'faker';

FactoryBot.define("bookList", {
  genre: "hardcover-fiction",
  books: () => FactoryBot.buildList<Book>("book", 3)
});

FactoryBot.define("book", {
    title: () => Faker.lorem.words(),
    author: () => Faker.name.findName(),
    rank: () => FactoryBot.seq(seq => seq)
})

export {
    FactoryBot
}