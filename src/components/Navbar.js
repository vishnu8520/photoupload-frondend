import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          Photo App
        </Link>
        <ul id="nav-mobile" className="right">
          <li>
            <Link to="/signin">Login</Link>
          </li>
          <li>
            <Link to="/signup">Register</Link>
          </li>
          <li>
            <Link to="/profile">My Posts</Link>
          </li>
          <li>
            <Link to="/addphoto">Add Photo</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
