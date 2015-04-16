Uploads = new FS.Collection('uploads',{
  stores:[new FS.Store.FileSystem('uploads',{path:'/home/andrew/workspace/meteor/exos/uploadexample/public'})]
});

Uploads.allow({
  insert:function(userId, fileObj){
    return true;
  },
  update: function(userId, fileObj){
    return true;
  },
  download:function(){
    return true;
  }
});





if (Meteor.isClient) {



  Template.hello.helpers({
    uploads: function (){
      return Uploads.find();
    }
  });

  Template.hello.events({
    'change .fileInput': function(event,template){
      FS.Utility.eachFile(event,function(file){
        var fileObj = new FS.File(file);
        Uploads.insert(fileObj, function(err) {
          console.dir(err);
        })
      })
    }
  });
  Meteor.subscribe("uploads");
}

  if (Meteor.isServer) {
    Meteor.publish("uploads", function () {
      return Uploads.find();
    });
};
