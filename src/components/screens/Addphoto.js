import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import M from 'materialize-css'

function Addphoto() {
    const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("")
  
  const postDetails = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'travelgram-app');
    data.append('cloud_name', 'vishnuscloud');
    fetch('https://api.cloudinary.com/v1_1/vishnuscloud/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUrl(data.url)
      })
      .catch((err) => {
        console.log(err);
      });


      fetch("/createpost",{
        method:"post",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          title,
          pic:url
        })
      }).then(res=>res.json())
      .then(data=>{
       if(data.error){
        M.toast({html: data.error})
       }
       else{
        M.toast({html: "Photo Post Success"})
        navigate('/')
       }
      }).catch(err=>{
        console.log(err);
      })

  }

  return (
    <div>
      <br /> <br /> <br />
      <div className="card input-filed">
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn">
            <span>Upload Photo</span>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button onClick={()=>postDetails()}>Submit</button>
      </div>
    </div>
  );
}

export default Addphoto;
