var blocked_users=getBlockedUsersFromBackground();
var videos=getVideosFromDOM();
for video in videos{
  if blocked_users.contains(video.user){
    video.user.block_video(video);
  }
}
