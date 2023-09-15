const {handleSaveBook} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: handleSaveBook,
  },
];

module.exports = routes;


