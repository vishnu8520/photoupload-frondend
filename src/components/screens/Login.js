import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import M from 'materialize-css'
function Login() {

  const navigate = useNavigate()
  const [password , setPAssword] = useState("")
  const [email , setEmail] = useState("")

  const PostData = () =>{
    fetch("/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        password,
        email
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data);
     if(data.error){
      M.toast({html: data.error})
     }
     else{
      localStorage.setItem("jwt",data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      M.toast({html: "Login Success"})
      navigate('/')
     }
    }).catch(err=>{
      console.log(err);
    })
  }
  return (
    <div className='signupdiv'>
    <div className="signup-form">
    <h2>Login</h2>
    <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPAssword(e.target.value)} />
    <button onClick={()=>{PostData()}}> Sign In</button>
  </div>
  </div>

  )
}

export default Login