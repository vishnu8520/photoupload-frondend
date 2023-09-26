import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import M from 'materialize-css'


function Register() {
  const navigate = useNavigate()
  const [name , setName] = useState("")
  const [password , setPAssword] = useState("")
  const [email , setEmail] = useState("")

  const PostData = () =>{
    fetch("/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        password,
        email
      })
    }).then(res=>res.json())
    .then(data=>{
     if(data.error){
      M.toast({html: data.error})
     }
     else{
      M.toast({html: data.message})
      navigate('/signin')
     }
    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <div className='signupdiv'>
    <div className="signup-form">
    <h2>Signup</h2>
    <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
    <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPAssword(e.target.value)} />
    <button onClick={()=>{PostData()}}>Sign Up</button>
  </div>
  </div>

  )
}

export default Register