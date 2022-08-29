import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

function Home() {

  let userObject = localStorage.getItem('user');
  const [user, setUser] = useState(JSON.parse(userObject))
  
  const navigate = useNavigate();

  useEffect(()=> {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("unauthorized")
      toast.warning("To access to content you must have account")
      navigate('/');
    } else {
      console.log(`AUTHORIZED`);
    }
  }, [])
  const logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <div className='HomeContainer'>
      <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" alt='wave' width="60px"/>
      <h2>HI <span className='primary-color'>{user.firstname+' '+user.lastname}</span></h2>
      <h2 className='secondary-color'>Welcome Back</h2>
      <button className='btn' onClick={logout}>LOGOUT</button>
    </div>
  )
}

export default Home