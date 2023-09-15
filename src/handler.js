const {
  extractBookFromRequest,
  saveBook,
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

module.exports = {
  handleSaveBook,
};
