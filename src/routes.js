const {handleSaveBook, handleListBooks} = require('./handler');

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
];

module.exports = routes;


