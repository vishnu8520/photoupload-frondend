import React, { useEffect, useState } from 'react';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/allpost', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      setData(result.posts);
    });
  }, []);

  return (
    <div>
      <h2>All Photos</h2>
      <div className="gallery">
        {data.map((post, index) => (
          <img key={index} className='item' src={post.photo} alt={post.title} />
        ))}
      </div>
    </div>
  );
}

export default Home;
