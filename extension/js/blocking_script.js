var blocked_users=getBlockedUsersFromBrowser();
var videos=getVideosFromDOM();

videos.forEach(processVideo);

function processVideo(video, index){
  video.print_self();
  if (blocked_users.contains(video.user)) {
    video.user.block_video(video);
  }
}

function getBlockedUsersFromBrowser(){
  return browser.storage.local.get("blocked_users");
}

function getVideosFromDOM(){
  var dom_videos=document.getElementsByClassName("yt-shelf-grid-item");
  var videos=[];
  for(var i=0;i<dom_videos.length;i++){
    videos.push(new Video(dom_videos[i]));
  }
  return videos;
}

function Video(dom_video){
  this.dom_video=dom_video;
  this.title=dom_video.getElementsByClassName("yt-lockup-title")[0].children[0].getAttribute("title");
    console.log(this.title)
}
