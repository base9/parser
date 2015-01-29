var Event = require('../events/events.model.js');
var Comment = require('../comments/comments.model.js');
var crontab = require('node-crontab');


//Dumps events that have ended
crontab.scheduleJob("0 * * * *", function() {
  console.log("DUMPING OLD EVENTS");
  deleteOldEvents();
});

//before and after maintenance, log the # of events and comments in DB.
crontab.scheduleJob("59 * * * *", function() {
  checkTableSize();
});

crontab.scheduleJob("1 * * * *", function() {
  checkTableSize();
});


function deleteOldEvents() {
  Event.where('endTime', '<', Date.now()).fetchAll({
    withRelated:['comments']
  })
  .then(function(collection) {
    collection.forEach(function (event){
      if(event.relations && event.relations.comments){
        var comments = event.relations.comments.models;
        comments.forEach(function(comment){
          comment.destroy();
        })
      }
      event.destroy();
    });
  });
}


function checkTableSize(){
  Comment.fetchAll()
  .then(function(collection){
    console.log(collection.length, "comments in DB.");
  });  
  Event.fetchAll()
  .then(function(collection){
    console.log(collection.length, "events in DB.");
  });
}
