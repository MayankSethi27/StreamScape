{
    console.log("homecomment");
    let createComment=function(){
        let newCommentform=$('#new-comment-form');

        newCommentform.submit(function(e){
            e.preventDefault();
            
            $.ajax({
                type:'post',
                url:"/comments/create",
// The serialize() function in AJAX is used to convert the form data into a query string that can be sent to the server as a parameter in an AJAX request
                data:newCommentform.serialize(),
                //data is getting response of comment which is created from return res.status(200).json({})....[in json format]
                success:function(data){
                   console.log(data);
                   let newComment=newCommentDom(data.data.comment);
                   $('.post-comments-lists>ul').prepend(newComment);
                   deleteComment($(' .delete-comment-button',newComment));
                 },
                  error:function(error){
                    console.log(error.responseText);
                } 
              });
            });
           }

       // method to display the post in DOM
        let newCommentDom=function(comment){
                console.log(comment); 
                console.log(comment.content);

                //this return part will display when we are doing the ajax request and home.ejs(frontend part) will be display when we load webpage(normally)
                return $(`<li id="comment-${comment._id}">
                <p>
                   
                    
                        <small>
                            <!-- p.id is id of that comment -->
                            <a class="delete-comment-button" href="/comments/destroy/${ comment._id }">Delete</a>
                        </small>
                       
                        ${comment.content}
                    <br>
                    <small>
                    ${comment.user.Name}
                    </small>
                </p>
            </li>              

           

       </ul>
   </div>
</div>
</li>`)


 }

 
//method to delete a post from DOM
let deleteComment = async function(deleteLink) {
    console.log(deleteLink);
    $(deleteLink).click(async function(e) {
      e.preventDefault();
  
      try {
        const response = await $.ajax({
          type: 'get',
          url: $(deleteLink).prop('href'),
        });
  
        console.log(response);
        $(`#comment-${response.data.comment_id}`).remove();
      } catch (error) {
        console.log(error.responseText);
      }
  
    
    });
  };
  

createComment();
    }
