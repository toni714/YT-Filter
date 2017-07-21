
var blocked_users=getBlockedUsersFromBrowser();
var blocked_dict=generateBlockedDict(blocked_users);
getVideosFromDOM(blocked_dict);

for(var username in blocked_dict){
  if(blocked_dict.hasOwnProperty(username)){
    blocked_dict[username].forEach(function (video, index){
      //TODO block this video like instructed
    });
  }
}
videos.forEach(processVideo);

function getBlockedUsersFromBrowser(blocked_users){
  ret={};
  blocked_users.forEach(function (user, index){
    ret[user.name]=[];
  });
  return ret;
}

function getBlockedUsersFromBrowser(){
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
    blocked_dict[vid.username].push(vid);
  }
}

function Video(dom_video, onWatchpage){
  this.dom_video=dom_video;
  if(onWatchpage){
    this.title=dom_video.getElementsByClassName("content-link")[0].getAttribute("title");
    //recommended video
  }else{
    //from homepage or other
    this.title=dom_video.getElementsByClassName("yt-lockup-title")[0].children[0].getAttribute("title");
  }
  this.print_self=function (){
    console.log(this.title);
  }
}
