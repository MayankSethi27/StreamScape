console.log("homecomment");

let createComment = function() {
  let newCommentform = $('#new-comment-form');

  newCommentform.submit(function(e) {
    e.preventDefault();

    $.ajax({
      type: 'post',
      url: "/comments/create",
      data: newCommentform.serialize(),
      success: function(data) {
        console.log(data);
        let newComment = newCommentDom(data.data.comment);
        $('#post-comments-lists>ul').prepend(newComment);
      },
      error: function(error) {
        console.log(error.responseText);
      }
    });
  });
}
let newCommentDom = function(comment) {
    console.log(comment);
    console.log(comment.content);
    return $(`<li id="comment-${comment._id}">
              <p>     
                <small>
                  <a href="/comments/destroy/${ comment._id }">Delete</a>
                </small>           
                <p>${comment.content}</p>
                <br>
                <small>${comment.user.Name}</small>
              </p>
            </li>`);
  }
  
  createComment();

  
  