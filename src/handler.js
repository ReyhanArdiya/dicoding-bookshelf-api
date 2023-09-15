const {
  extractBookFromRequest,
  saveBook,
  listBooks,
  getBookById,
  updateBook,
  deleteBook,
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

const handleListBooks = (request, h) => {
  const books = listBooks(request.query);

  const response = h.response({
    status: 'success',
    data: {
      books,
    },
  });
  response.code(200);

  return response;
};

const handleGetBookById = (request, h) => {
  let response;

  try {
    response = h.response({
      status: 'success',
      data: {
        book: getBookById(request.params.bookId),
      },
    }).code(200);
  } catch (err) {
    response = h.response({
      status: 'fail',
      message: err.message,
    }).code(err.code);
  }

  return response;
};

const handleUpdateBook = (request, h) => {
  let response;

  try {
    updateBook(request.params.bookId, request.payload);

    response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  } catch (err) {
    response = h.response({
      status: 'fail',
      message: err.message,
    }).code(err.code);
  }

  return response;
};

const handleDeleteBook = (request, h) => {
  let response;

  try {
    deleteBook(request.params.bookId);

    response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  } catch (err) {
    response = h.response({
      status: 'fail',
      message: err.message,
    }).code(err.code);
  }

  return response;
};


module.exports = {
  handleSaveBook,
  handleListBooks,
  handleGetBookById,
  handleUpdateBook,
  handleDeleteBook,
};
