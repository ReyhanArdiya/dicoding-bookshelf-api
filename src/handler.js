const {
  extractBookFromRequest,
  saveBook,
  listBooks,
} = require('./books');

const handleSaveBook = (request, h) => {
  let response;

  try {
    const newBook = extractBookFromRequest(request);

    saveBook(newBook);

    response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: newBook.id,
      },
    });

    response.code(201);
  } catch (err) {
    response = h
        .response({
          status: 'fail',
          message: err.message,
        });
    response.code(err.code);
  }

  return response;
};

const handleListBooks = (_request, h) => {
  const books = listBooks();

  const response = h.response({
    status: 'success',
    data: {
      books,
    },
  });
  response.code(200);

  return response;
};

module.exports = {
  handleSaveBook,
  handleListBooks,
};
