var db = require('../../db/db.js');
var bookshelf = require('bookshelf');


var Event = bookshelf(db).Model.extend({
  tableName: 'events',
  hasTimestamps: true,
});

module.exports = Event;