const {
  handleSaveBook,
  handleListBooks,
  handleGetBookById,
  handleUpdateBook,
  handleDeleteBook,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: handleSaveBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: handleListBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: handleGetBookById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: handleUpdateBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: handleDeleteBook,
  },
];

module.exports = routes;


