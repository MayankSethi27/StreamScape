//method to submit the post form using AJAX
{
  //creating post::sending data
  let createPost = function () {
    let newPostform = $("#new-post-form");

    //this function prevent default submmission of post in normal way from post-create form when we click 'submit'
    newPostform.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        //-->this 'data:newPostform.serialize()' contains the data we received from form
        //( serializing means to convert the form data into JSON { key-value pair }
        data: newPostform.serialize(),

        //data is getting response of post which is created from return res.status(200).json({})....[in json format]
        //this data is response from controller which has created post info
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $("#post-list-container>ul").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));

          new Noty({
            theme: 'relax',
            text: "Post published!",
            type: 'success',
            layout: 'topRight',
            timeout: 1500
            
        }).show();

        //call the create comment class
          new PostComments(data.data.post._id);

          // CHANGE :: enable the functionality of the toggle like button on the new post
          new ToggleLike($(' .toggle-like-button', newPost));

        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // method to display the post in DOM
  let newPostDom = function (post) {
    
    return $(`<li id="post-${post._id}">
    <p>
      
     
           <small>
               <!-- i.id is id of that post -->
               <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
           </small>
           

       ${post.content}
   <br>  
    <small>
       ${post.user.Name}
   </small>
   <br>
   <small>
       
           <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
               0 Likes
           </a>
       
   </small>
</p>
<div class="post-comments">
   
    <!-- form to create comment -->
   <form action="/comments/create" method="post" id="post-${post._id}-comments-form">
       <input type="text" name="content" placeholder="Type Here to add comment......" required>
       <!-- value attribute -> the content in the value set is sent to the server on form submission.-->
       <!--value="${post._id} is the id of post in which comment is created-->
       <input type="hidden" name="post" value="${post._id}">
       <input type="submit" value="Add Comment">
   </form>


   <div class="post-comments-lists">
       <ul id="post-comments-${post._id}">
           

       </ul>
   </div>
</div>
</li>
        
`);
  };

  //method to delete a post from DOM
  let deletePost = function (deleteLink) {
    console.log(deleteLink);
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          console.log(data);
          //this remove() is deleting post from ejs part
          $(`#post-${data.data.post_id}`).remove();

          new Noty({
            theme: 'relax',
            text: "Post Deleted",
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

  let convertPostsToAjax = function () {
    $("#post-list-container>ul>li").each(function () {
      let self = $(this);
      let deleteButton = $(" .delete-post-button", self);
      deletePost(deleteButton);
      // get the post's id by splitting the id attribute
      let postId = self.prop("id").split("-")[1];
      new PostComments(postId);
    });
  };

  createPost();
  convertPostsToAjax();
}
