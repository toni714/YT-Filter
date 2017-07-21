getBlockedUsersFromBrowser().then(continue_blocking);



function continue_blocking(users){
  var blocked_dict={};
  console.log(users["blocked_users"]);
  users["blocked_users"].forEach(function (user, index){
    //TODO change to user.name
    blocked_dict[user]=[];
  });
  getVideosFromDOM(blocked_dict)

  console.log(blocked_dict);
  for(var username in blocked_dict){
    if(blocked_dict.hasOwnProperty(username)){
      blocked_dict[username].forEach(function (video, index){
        //TODO block this video like instructed
        console.log(video);
      });
    }
  }
}

function getBlockedUsersFromBrowser(){
  browser.storage.local.set({blocked_users:["test", "Galileo", "Zombey"]});
  return browser.storage.local.get("blocked_users");
}

function getVideosFromDOM(blocked_dict){
  var dom_videos=null
  var onWatchpage=window.location.href.indexOf("watch?v=")!==-1
  if (onWatchpage) {
    dom_videos=document.getElementsByClassName("video-list-item");
  }else{
    dom_videos=document.getElementsByClassName("yt-shelf-grid-item");
  }

  for(var i=0;i<dom_videos.length;i++){
    var vid=new Video(dom_videos[i], onWatchpage)
    //vid.print_self();
    if(blocked_dict.hasOwnProperty(vid.username)){
      blocked_dict[vid.username].push(vid);
    }
  }
}

function Video(dom_video, onWatchpage){
  this.dom_video=dom_video;
  //TODO add username
  if(onWatchpage){
    this.title=dom_video.getElementsByClassName("content-link")[0].getAttribute("title");
    this.username=dom_video.getElementsByClassName("g-hovercard")[0].innerHTML;
    //recommended video
  }else{
    //from homepage or other
    //TODO differentiate search and homepage
    this.title=dom_video.getElementsByClassName("yt-lockup-title")[0].children[0].getAttribute("title");
    this.username=dom_video.getElementsByClassName("g-hovercard")[0].innerHTML;
  }
  this.print_self=function (){
    console.log("TITLE: "+this.title+" USERNAME: "+this.username);
  }
  //TODO add blocking option
}
