console.log('toggle 123')
$(document).ready(function() {
  
  $(".toggle-friend-btn").click(function(event) {
    event.preventDefault();
    console.log('prevented');
    var toggleFriendBtn = $(this);
    $.ajax({
      type: "GET",
      url: toggleFriendBtn.attr("href"),
      success: function(data) {
        console.log(data.deleted);
        if (data.deleted) {
          toggleFriendBtn.html("Add Friend");
        } else {
          toggleFriendBtn.html("Remove Friend");
        }
        window.location.href = "/";
      },
      error: function(error) {
        console.log(error.responseText);
      }
    });
  });
  
});
