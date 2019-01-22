import { Book } from "./book";

export class BookList {
  genre: string;
  books: Array<Book>;

  constructor(genre: string, books: Array<Book>) {
    this.genre = genre;
    this.books = books;
  }
}
