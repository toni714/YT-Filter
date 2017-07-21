var blocked_users=getBlockedUsersFromBrowser();
var videos=getVideosFromDOM();
for video in videos{
  video.print_self()
  if blocked_users.contains(video.user){
    video.user.block_video(video);
  }
}

function getBlockedUsersFromBackground(){
  browser.storage.local.get("blocked_users");
  //return browser.runtime.sendMessage("GET USERS");
}

function getVideosfromDOM(){
  var dom_videos=document.getElementsByClassName("yt-shelf-grid-item");
  var videos=[];
  for dom_video in dom_videos{
    videos.add(new Video(dom_video));
  }
  return videos;
}

function Video(dom_video){
  this.dom_video=dom_video;
  this.title=dom_video.getChildrenByClassName("yt-lockup-title")[0].children[0].getAttribute("title");
    console.log(this.title)
}
