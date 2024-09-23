import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/PostDetailsPage.css'; // Ensure the path is correct

const PostDetailsPage = ({ token }) => {  // Receive token as a prop
  const { id } = useParams();
  const navigate = useNavigate(); // For navigating after deletion
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the post!", error);
      });
  }, [id]);

  const handleDelete = () => {
    if (!token) {
      alert("You need to be logged in to delete a post."); // Alert if not logged in
      return;
    }

    axios.delete(`http://localhost:3001/posts/${id}`, {
      headers: { Authorization: token },  // Include token in the headers
    })
      .then(() => {
        navigate('/'); // Redirect to home after deletion
      })
      .catch(error => {
        console.error("There was an error deleting the post!", error);
      });
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-details-container">
      <h1 className="post-details-title">{post.title}</h1>
      <p className="post-details-content">{post.content}</p>
      <p className="post-details-author"><strong>Author:</strong> {post.author}</p>
      <div className="post-details-buttons">
        <Link to={`/create-edit/${id}`}>
          <button>Edit Post</button>
        </Link>
        <button onClick={handleDelete} className="delete-post-button">Delete Post</button>
        <Link to="/">
          <button>Back to Posts</button>
        </Link>   
      </div>
    </div>
  );
};

export default PostDetailsPage;
