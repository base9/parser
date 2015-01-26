var db = require('../../db/db.js');
var bookshelf = require('bookshelf');
var Comment = require('../comments/comments.model.js');


var Event = bookshelf(db).Model.extend({
  tableName: 'events',
  hasTimestamps: true,
  comments: function() {
    return this.hasMany(Comment);
  }
});



  
module.exports = Event;