
// import React, { useEffect, useState } from 'react';
// import {useNavigate} from 'react-router-dom'

// function Profile() {
//   const navigate =  useNavigate()
//   const [userPosts, setUserPosts] = useState([]);

//   const handleLogout = () => {
//     localStorage.removeItem('jwt');
//     navigate('/signin')
//   };

//   useEffect(() => {
//     const fetchUserPosts = async () => {
//       try {
//         const response = await fetch('/mypost', {
//           method: 'GET',
//           headers: {
//             'Authorization': 'Bearer ' + localStorage.getItem('jwt')
//           }
//         });
//         const result = await response.json();
//         setUserPosts(result.mypost);
//       } catch (error) {
//         console.error('Error fetching user posts:', error);
//       }
//     };

//     fetchUserPosts();
//   }, []);

//   return (
//     <div>
//     <h2>My Photos</h2>
//     <button onClick={handleLogout}>Logout</button>
//     <div className="gallery">
//       {userPosts && userPosts.length > 0 ? (
//         userPosts.map((post, index) => (
//           <img key={index} className='item' src={post.photo} alt={post.title} />
//         ))
//       ) : (
//         <p>You Must be Logged in </p>
//       )}
//     </div>
//   </div>
//   );
// }

// export default Profile;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/signin');
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`/deletepost/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
      });
      const result = await response.json();
      console.log('Post deleted:', result);
      // Remove the deleted post from the userPosts state
      setUserPosts(userPosts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch('/mypost', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
          }
        });
        const result = await response.json();
        setUserPosts(result.mypost);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <div>
      <h2>My Photos</h2>
      <button onClick={handleLogout}>Logout</button>
      <div className="gallery">
        {userPosts && userPosts.length > 0 ? (
          userPosts.map((post, index) => (
            <div key={index} className='item'>
              <img className='item' src={post.photo} alt={post.title} />
              <button onClick={() => handleDeletePost(post._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default Profile;


