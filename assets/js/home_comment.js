class PostComments {
    constructor(postId) {
      console.log("post comments");
      this.postId = postId;
      this.postContainer = $(`#post-${postId}`);
      this.newCommentForm = $(`#post-${postId}-comments-form`);
  
      let self = this;
  
      this.createComment(postId);
  
      $(" .delete-comment-button", this.postContainer).each(function () {
        self.deleteComment($(this));
      });
    }
  
    createComment = function (postId) {
        console.log(this);
      let pSelf = this;
      this.newCommentForm.submit(function (e) {
        e.preventDefault();
        
        let self = this;
        $.ajax({
          type: "post",
          url: "/comments/create",
          // The serialize() function in AJAX is used to convert the form data into a query string that can be sent to the server as a parameter in an AJAX request
          data: $(self).serialize(),
          //data is getting response of comment which is created from return res.status(200).json({})....[in json format]
          success: function (data) {
            console.log(data);
            let newComment = pSelf.newCommentDom(data.data.comment);
            $(`#post-comments-${postId}`).prepend(newComment);
            pSelf.deleteComment($(" .delete-comment-button", newComment));

            // CHANGE :: enable the functionality of the toggle like button on the new comment
            new ToggleLike($(' .toggle-like-button', newComment));

            new Noty({
                theme: 'relax',
                text: "Comment published!",
                type: 'success',
                layout: 'topRight',
                timeout: 1500
                
            }).show();
    
          },
          error: function (error) {
            console.log(error.responseText);
          },
        });
      });
    };
  
    // method to display the post in DOM
    newCommentDom = function (comment) {
      console.log(comment);
      console.log(comment.content);
  
      //this return part will display when we are doing the ajax request and home.ejs(frontend part) will be display when we load webpage(normally)
      return $(`<li id="comment-${comment._id}">
                          <p>    
                              <small>
                                  <!-- p.id is id of that comment -->
                                  <a class="delete-comment-button" href="/comments/destroy/${comment._id}">Delete</a>
                              </small>
                              ${comment.content}
                              <br>
                              <small>
                              ${comment.user.Name}
                              </small>

                              <small>
                            
                              <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                                  0 Likes
                              </a>
                          
                          </small>
                          
                          </p>
                      </li>              
                  </ul>
              </div>
          </div>
      </li>`);
    };
  
    //method to delete a post from DOM
    deleteComment = function (deleteLink) {
      console.log(deleteLink);
      $(deleteLink).click(function (e) {
        e.preventDefault();
  
        $.ajax({
          type: "get",
          url: $(deleteLink).prop("href"),
          success: function (data) {
            console.log(data);
            //this remove() is deleting post from ejs part
            $(`#comment-${data.data.comment_id}`).remove();

            new Noty({
                theme: 'relax',
                text: "Comment Deleted!",
                type: 'success',
                layout: 'topRight',
                timeout: 1500
                
            }).show();
    
          },
          error: function (error) {
            console.log(error.responseText);
          },
        });
      });
    };
  }
  