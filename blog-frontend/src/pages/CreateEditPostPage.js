import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';
import '../css/CreateEditPostPage.css'; // Ensure the path is correct

const CreateEditPostPage = ({ token }) => { // Accept token as a prop
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  // Check if token is available, if not redirect to login
  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [token, navigate]);

  useEffect(() => {
    if (id) {
      axios.get(`https://blog-system-with-authentication.onrender.com/posts/${id}`)
        .then(response => {
          const post = response.data;
          setTitle(post.title);
          setContent(post.content);
          setAuthor(post.author);
        })
        .catch(error => {
          console.error("There was an error fetching the post for editing!", error);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { title, content, author };

    const config = {
      headers: { Authorization: token }, // Include token in request headers
    };

    if (id) {
      axios.put(`https://blog-system-with-authentication.onrender.com/posts/${id}`, post, config)
        .then(() => {
          navigate(`/posts/${id}`);
        })
        .catch(error => {
          console.error("There was an error updating the post!", error);
        });
    } else {
      axios.post('https://blog-system-with-authentication.onrender.com/posts', post, config)
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          console.error("There was an error creating the post!", error);
        });
    }
  };

  return (
    <div className="create-edit-container">
      <h1 className="create-edit-title">{id ? "Edit Post" : "Create New Post"}</h1>
      <form className="create-edit-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <div className="form-buttons">
          <button type="submit">{id ? "Update Post" : "Create Post"}</button>
          <Link to="/">
            <button type="button" className="back-to-posts-button">Back to Posts</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateEditPostPage;
