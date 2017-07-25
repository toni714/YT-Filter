//-----------------GlobaLs-----------------------

var typesOfPages={
  "Other":0,
  "Watchpage":1
}

//-----------------"Main"------------------------

//get a list of the blocked users stored in the browser
//when you receive them then blockUsers(users);
getBlockedUsersFromBrowser().then(blockUsers);

//-----------------Functions---------------------

function getBlockedUsersFromBrowser(){
  createDummyData();
  //return the blocked_users list stored in the browser
  return browser.storage.local.get("blocked_users");
}

function createDummyData(){
  //insert some dummy users into the browser for testing
  browser.storage.local.set({blocked_users:["Galileo", "Zombey", "Julien Bam"]});
}

function blockUsers(users_promise){

  //get the users list from the promise
  var users=users_promise["blocked_users"];
  //Prepare the dict with empty list for all blocked users (should maybe be changed only to present users later to save memory TODO)
  //dict looks like this
  /*{
     user1:[],
     user2:[],
     ...
     userN:[]
  }*/
  //the lists are for that users videos
  var blocked_dict={};
  users.forEach(function (user, index){
    //TODO change to user.name as soon as users are created automatically as objects
    blocked_dict[user]=[];
  });

  insertAllVideosFromDOMIn(blocked_dict);
  //iterate over all blocked users and their found videos
  for(var username in blocked_dict){
    if(blocked_dict.hasOwnProperty(username)){
      blocked_dict[username].forEach(function (video, index){
        //TODO block this video like instructed by user REQUIRES #9 implemented/fixed

        //print blocked video
        video.print_self()
      });
    }
  }
}

function insertAllVideosFromDOMIn(blocked_dict){
  //find all videos of blocked users and insert them in blocked_dict
  var dom_videos=null;

  //by default you ar on a "other" page which for now means the youtube homepage or unrecognized
  var typeOfPage=typesOfPages["Other"];

  //if you are on a watchpage set typeOfPage to that
  if(window.location.href.indexOf("watch?v=")!==-1){
    typeOfPage=typesOfPages["Watchpage"];
  }
  //get all video depending on what type of page you are
  switch(typeOfPage){
    case typesOfPages["Watchpage"]:
      //these are the sidebar recommended videos
      dom_videos=document.getElementsByClassName("video-list-item");
      break;
    case typesOfPages["Other"]:
      //these are the videos on the homepage
      dom_videos=document.getElementsByClassName("yt-shelf-grid-item");
      break;
  }

  //iterate over all videos
  for(var i=0;i<dom_videos.length;i++){
    //copy down the videos DOM Element, title, user and thumbnail depending what kind of video it is for later use
    var dom_video=dom_videos[i];
    var title=null;
    var thumbnail=dom_video.getElementsByTagName("img")[0];
    var username=dom_video.getElementsByClassName("g-hovercard")[0].innerHTML;
    switch(typeOfPage){
      case typesOfPages["Watchpage"]:
        title=dom_video.getElementsByClassName("content-link")[0].getAttribute("title");
        break;
      case typesOfPages["Other"]:
        title=dom_video.getElementsByClassName("yt-lockup-title")[0].children[0].getAttribute("title");
        break;
    }
    var vid=new Video(title, thumbnail, username, dom_videos[i])
    //vid.print_self();
    //if the videos username is in the blocked users add it to that users list in the blocked_dict
    if(blocked_dict.hasOwnProperty(vid.username)){
      blocked_dict[vid.username].push(vid);
    }
  }
}


//the video class
function Video(title, thumbnail, username, dom_video){
  //----Members----
  this.title=title;
  this.thumbnail=thumbnail;
  this.username=username;
  this.dom_video=dom_video;

  this.print_self=function (){
    console.log("USERNAME: "+this.username+" TITLE: "+this.title+" THUMBNAIL: "+this.thumbnail+" DOM: "+this.dom_video);
  }
}

//----UNUSED (for future use)
function save_blocked_users(blocked_users_save){
  browser.storge.local.set({blocked_users: blocked_users_save});
}
