const nanoId = require('nanoid');

/**
 * @class Book
 */
class Book {
  /**
     *
     * @param {string} name
     * @param {number} year
     * @param {string} author
     * @param {string} summary
     * @param {string} publisher
     * @param {number} pageCount
     * @param {number} readPage
     * @param {boolean} reading
     * @param {boolean} finished
     * @param {string} insertedAt
     * @param {string} updatedAt
     * @param {string} id
     */
  constructor(
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished = pageCount === readPage,
      insertedAt = new Date().toISOString(),
      updatedAt = insertedAt,
      id = nanoId.nanoid(16),
  ) {
    this.name = name;
    this.year = year;
    this.author = author;
    this.summary = summary;
    this.publisher = publisher;
    this.pageCount = pageCount;
    this.readPage = readPage;
    this.reading = reading;
    this.finished = finished;
    this.insertedAt = insertedAt;
    this.updatedAt = updatedAt;
    this.id = id;
  }
}

/**
 * @type {Map<string, Book>}
 */
const books = new Map();

// UTILS
const filterBooksByName = (name) => {
  const filteredBooks = [];

  for (const book of books.values()) {
    if (book.name.toLowerCase().match(name, 'gi')) {
      filteredBooks.push(book);
    }
  }

  return filteredBooks;
};

const filterBooksByReading = (reading = true) => {
  const filteredBooks = [];

  for (const book of books.values()) {
    if (book.reading === reading) {
      filteredBooks.push(book);
    }
  }

  return filteredBooks;
};

const filterBooksByFinished = (finished = true) => {
  const filteredBooks = [];

  for (const book of books.values()) {
    if (book.finished === finished) {
      filteredBooks.push(book);
    }
  }

  return filteredBooks;
};

module.exports = {
  books,
  Book,
  filterBooksByName,
  filterBooksByReading,
  filterBooksByFinished,
};
