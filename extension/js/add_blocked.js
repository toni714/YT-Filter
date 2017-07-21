
function save_blocked_users(blocked_users_save){
  browser.storge.local.set({blocked_users: blocked_users_save});
}
