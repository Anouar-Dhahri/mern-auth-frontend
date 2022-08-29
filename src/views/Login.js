import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API } from './../configs'
import logo from './../assets/logo.png'

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const login = async () => {
    try {
      await axios.post(`${API}/auth/signin`, {email: email, password: password})
      .then((res)=>{
        if(res.data.success){
          toast.success(res.data.message)
          navigate('/home')
          console.log(res.data)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          localStorage.setItem('token', res.data.token)
        }else{
          if(res.data.errors){
            console.log(res.data.errors)
            res.data.errors.map((error)=>(
              toast.error(error.msg)
            ))
          }else {
            toast.error(res.data.message)
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='loginContainer'>
      <div className='loginContainer-leftRow'>
        <Link to='/signup'>
          <button className='loginContainer-leftRow__btn'>Sign up</button>
        </Link>
      </div>
      <div className='loginContainer-rightRow'>
        <img src={logo} className='loginContainer-rightRow__logo' alt='logo' />
        <h2>LOGIN</h2>
        <input type='text' className='textField' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <input type='password' className='textField' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        <button onClick={login} className='btn'>Login</button>
      </div>
    </div>
  )
}

export default Login