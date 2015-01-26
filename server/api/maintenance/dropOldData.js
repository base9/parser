var Event = require('../events/events.model.js');
var Comment = require('../comments/comments.model.js');
var crontab = require('node-crontab');


//Dumps events that have endTimes before 3:00 a.m. of today
crontab.scheduleJob("0 3 * * *", function() {
  console.log("DUMPING OLD EVENTS");
  deleteOldEvents();
});

//1 minute after dumping old events, log the # of events and comments in DB.
crontab.scheduleJob("1 3 * * *", function() {
  checkTableSize();
});


function deleteOldEvents() {
  var today = Date.now();
  Event.where('endTime', '<', today).fetchAll({
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
    console.log(collection.length, "comments in DB after maintenance.");
  });  
  Event.fetchAll()
  .then(function(collection){
    console.log(collection.length, "events in DB after maintenance.");
  });
}
