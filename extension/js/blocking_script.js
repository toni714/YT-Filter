
var blocked_users=getBlockedUsersFromBrowser();
var videos=getVideosFromDOM();

videos.forEach(processVideo);

function processVideo(video, index){
  video.print_self();
  /*if (blocked_users.contains(video.user)) {
    video.user.block_video(video);
  }*/
}

function getBlockedUsersFromBrowser(){
  return browser.storage.local.get("blocked_users");
}

function getVideosFromDOM(){
  var dom_videos=null
  var onWatchpage=window.location.href.indexOf("watch?v=")!==-1
  if (onWatchpage) {
    console.log("watchpage")
    dom_videos=document.getElementsByClassName("video-list-item");
  }else{
    console.log("otherpage")
    dom_videos=document.getElementsByClassName("yt-shelf-grid-item");
  }
  var videos=[];
  for(var i=0;i<dom_videos.length;i++){
    console.log(dom_videos[i]);
    videos.push(new Video(dom_videos[i], onWatchpage));
  }
  return videos;
}

function Video(dom_video, onWatchpage){
  this.dom_video=dom_video;
  if(onWatchpage){

    this.title=dom_video.getElementsByClassName("content-link")[0].getAttribute("title");
    console.log(this.title);
  }else{
    this.title=dom_video.getElementsByClassName("yt-lockup-title")[0].children[0].getAttribute("title");
    console.log(this.title);
  }
  //console.log(this.title)
  this.print_self=function (){
    console.log(this.title);
  }
}
