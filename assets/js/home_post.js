//method to submit the post form using AJAX
{
   let createPost=function(){
    let newPostform=$('#new-post-form');

    //this function prevent default submmission of post in normal way from post-create form when we click 'submit'
    newPostform.submit(function(e){
        e.preventDefault();
        

        $.ajax({
            type:'post',
            url:"/posts/create",
            data:newPostform.serialize(),
            //data is getting response of post which is created from return res.status(200).json({})....[in json format]
            success:function(data){
               let newPost=newPostDom(data.data.post);
               $('#post-list-container>ul').prepend(newPost);
               deletePost($(' .delete-post-button',newPost));
            },
            error:function(error){
                console.log(error.responseText);
            }

        });
    });
   }

   // method to display the post in DOM
   let newPostDom=function(post){
    console.log(post);
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
</p>
<div class="post-comments">
   
    <!-- form to create comment -->
   <form action="/comments/create" method="post">
       <input type="text" name="content" placeholder="Type Here to add comment......" required>
       <!-- value attribute -> the content in the value set is sent to the server on form submission.-->
       <!--value="${post._id} is the id of post in which comment is created-->
       <input type="hidden" name="post" value="${post._id}">
       <input type="submit" value="Add Comment">
   </form>


   <div class="post-comments-lists">
       <ul id="post-comments${post._id}">
           

       </ul>
   </div>
</div>
</li>
        
`)
   
}



//method to delete a post from DOM
let deletePost=function(deleteLink){
    console.log(deleteLink);
    $(deleteLink).click(function(e){
        e.preventDefault();
        
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                console.log(data);
                //this remove() is deleting post from ejs part
                $(`#post-${data.data.post_id}`).remove();
            },error:function(error){
                console.log(error.responseText);
            }
        })
    })
}

createPost();
}
