const nanoId = require('nanoid');
const {HttpError} = require('./errors');

/**
 * @class Book
 */
class Book {
  /**
     * Expects an object for easier destructuring
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
  constructor({
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
  }) {
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
const extractBookFromRequest = (request) => {
  return new Book({...request.payload});
};

const saveBook = (book) => {
  const {
    name,
    pageCount,
    readPage,
  } = book;

  if (!name) {
    throw new HttpError(400, 'Gagal menambahkan buku. Mohon isi nama buku');
  }

  if (readPage > pageCount) {
    // eslint-disable-next-line max-len
    throw new HttpError(400, 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
  }

  books.set(book.id, book);
};

const listBooks = () => {
  const normalizedBooks = [];

  for (const book of books.values()) {
    normalizedBooks.push({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    });
  }

  return normalizedBooks;
};

const getBookById = (id) => {
  const book = books.get(id);

  if (!book) {
    throw new HttpError(404, 'Buku tidak ditemukan');
  }

  return book;
};

const updateBook = (newBookData) => {
  const {
    name,
    pageCount,
    readPage,
  } = newBookData;

  if (!name) {
    throw new HttpError(400, 'Gagal memperbarui buku. Mohon isi nama buku');
  }

  if (readPage > pageCount) {
    // eslint-disable-next-line max-len
    throw new HttpError(400, 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
  }

  if (!books.has(newBookData.id)) {
    throw new HttpError(404, 'Gagal memperbarui buku. Id tidak ditemukan');
  };

  const originalBook = {...books.get(newBookData.id)};

  for (const key of Object.keys(newBookData)) {
    originalBook[key] = newBookData[key];
  }

  books.set(originalBook.id, originalBook);
};

const deleteBookById = (id) => {
  const book = books.delete(id);

  if (!book) {
    throw new HttpError(404, 'Buku gagal dihapus. Id tidak ditemukan');
  }

  return book;
};

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
  saveBook,
  listBooks,
  getBookById,
  updateBook,
  deleteBookById,
  extractBookFromRequest,
};
