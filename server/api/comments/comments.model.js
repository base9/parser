var db = require('../../db/db.js');
var bookshelf = require('bookshelf');

var Comment = bookshelf(db).Model.extend({
  tableName: 'comments',
  hasTimestamps: true,
});

module.exports = Comment;