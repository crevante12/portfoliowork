import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserProvider';

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})
export default function Funko(props) {
  const { _id, token, } = props;
   
const {likedItem,disLikedItem}= useContext(UserContext)
  const [comment, setComment] = useState({comment:""});
  const [comments, setComments] = useState([]);
  
  
  useEffect(() => {
    userAxios
      .get(`/api/comment`)
      .then((res) => {
        setComments(res.data); // Assuming comments are received as an array
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
      });
  }, []);
  



  const postComment = () => {
    userAxios
      .post(`/api/comment/${_id}`,comment) // Send the comment data as an object with the "comment" property
      .then((res) => {
        // Assuming the response contains the newly created comment
        const newComment = res.data;
  
        // Update the comments state with the new comment
        setComments((prevComments) => [...prevComments, newComment]);
  
        // Clear the input field
        setComment({ comment: "" });
      })
      .catch((err) => {
        console.error("Error creating comment:", err);
      });
  };

  const filteredComments = comments.filter(comment => {
    console.log(comment.funko === _id)
    
    return comment.funko === _id
  }
    ) 




console.log(props)



  const handleChange = (e) => {
    const {name,value}= e.target
    setComment(prevInput => ( {    ...prevInput,[name]:value } ))
  }

   ;

   return (
    <div className="issue-container">
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <img src={props.imgUrl} alt="Issue" className="issue-image" />
      {props.userLikes && props.userDisLikes &&
      <>
      <p>Likes: {props.userLikes.length}</p>
      <p>Dislikes:{props.userDisLikes.length}</p>
      </>}
      
  
      
      <div className="like-dislike-container">
        <button onClick={()=>likedItem(_id)}>
          Like
        </button>
        <button onClick={()=>disLikedItem(_id)}>
          Dislike
        </button>
      </div>
    <div className='subform'>
      <input
        type="text"
        name="comment"
        value={comment.comment}
        onChange={handleChange}
        placeholder="Add a comment..."
        className="comment-input"
      />
       <button onClick={postComment} className="comment-submit">
        Submit
      </button>
      </div>
      <h3 className='comment-container'>Comments:</h3>
      <ul className="comment-list">
        {filteredComments.map((commentData, index) => (
          <li key={index} className="comment-item">
            {commentData.comment}
          </li>
        )
        )}
      </ul>
     
  
    </div>
  );
        }
