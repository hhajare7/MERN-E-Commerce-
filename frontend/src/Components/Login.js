import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }
  })

  const handleLogin = async () => {
    try {

      let result = await fetch('http://localhost:5050/login', {
        method: 'post',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      result = await result.json();
      console.log(result);
      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        console.log('logged in');
        navigate("/");
      } else {
        alert("Invalid Login Credentials")
        console.log('Invalid');

      }
    } catch (error) {
      console.error('Failed to login:', error);
      alert('Failed to login');
    }

  }
  return (
    <div className='login'>
      <h1>Login</h1>
      <input className='input-box' type="text" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} value={email} />
      <input className='input-box' type="text" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} value={password} />
      <button onClick={handleLogin} className='app-button' type='button'>Login</button>
    </div>
  )
}

export default Login