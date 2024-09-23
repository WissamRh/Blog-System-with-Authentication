import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/HomePage.css'; // Ensure the path is correct

const HomePage = ({ token, setToken }) => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input
  const [filteredPosts, setFilteredPosts] = useState([]); // State for filtered posts
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const postsPerPage = 4; // Number of posts per page
  const navigate = useNavigate(); // For navigation after logout

  useEffect(() => {
    axios.get('http://localhost:3001/posts')
      .then(response => {
        setPosts(response.data);
        setFilteredPosts(response.data); // Initially, all posts are shown
      })
      .catch(error => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  // Filter posts when the search term changes
  useEffect(() => {
    setFilteredPosts(
      posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, posts]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
    setToken(null); // Update the token state in App.js
    navigate('/'); // Redirect to the home page after logout
  };

  // Get current posts for the page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home-container">
      <h1 className="home-title">All Blog Posts</h1>

      {/* Search input field */}
      <input
        type="text"
        placeholder="Search posts..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
      />

      <ul className={`posts-list ${currentPosts.length === 1 ? 'single-post' : ''}`}>
        {currentPosts.map(post => (
          <li key={post.id} className="post-item">
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.content.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <Link to="/create-edit">
        <button className="new-post-button">Create New Post</button>
      </Link>
       {/* Logout button, only shown if logged in */}
       {token && (
        <button onClick={handleLogout} className="logout-button">Logout</button>
      )}
    </div>
  );
};

export default HomePage;
