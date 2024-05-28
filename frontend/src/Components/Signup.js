import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }
  },[])

  const collectData = async () => {
    console.log(name, email, password);
    let result = await fetch('http://localhost:5050/register', {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem('user', JSON.stringify(result.result))
    localStorage.setItem('token', JSON.stringify(result.auth))
    navigate('/')
  }

  return (
    <div className='register'>
      <h1>Register</h1>
      <input className='input-box' type="text" placeholder='Enter Name'
        onChange={(e) => setName(e.target.value)}
        value={name} />
      <input className='input-box' type="text" placeholder='Enter Email'
        onChange={(e) => setEmail(e.target.value)}
        value={email} />
      <input className='input-box' type="password" placeholder='Enter Password'
        onChange={(e) => setPassword(e.target.value)}
        value={password} />
      <button className='app-button' onClick={collectData}>Sign-up</button>
    </div>
  )
}

export default Signup