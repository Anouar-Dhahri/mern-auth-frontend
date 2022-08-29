import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API } from './../configs'
import logo from './../assets/logo.png'

function Signup() {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const signup = async () => {
    try {
      await axios.post(`${API}/auth/signup`, {
        firstname: firstname, lastname: lastname,
        email: email, password: password
      })
      .then((res)=>{
        if(res.data.success){
          toast.success(res.data.message)
          navigate('/')
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
    <div className='signupContainer'>
      <div className='signupContainer-leftRow'>
        <Link to='/'>
          <button className='signupContainer-leftRow__btn'>login</button>
        </Link>
      </div>
      <div className='signupContainer-rightRow'>
        <img src={logo} className='signupContainer-rightRow__logo' alt='logo' />
        <h2>CREATE AN ACCOUNT</h2>
        <input type='text' className='textField' placeholder='Firstname' onChange={(e) => setFirstname(e.target.value)} />
        <input type='text' className='textField' placeholder='Lastname' onChange={(e) => setLastname(e.target.value)} />
        <input type='text' className='textField' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <input type='password' className='textField' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        <button onClick={signup} className='btn'>Sign up</button>
      </div>
    </div>
  )
}

export default Signup