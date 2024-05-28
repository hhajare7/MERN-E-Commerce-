import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate()

  const logout = () => {
    console.log('logged out');
    localStorage.clear();
    navigate('./signup')
  }

  return (
    <div>
      <img className='logo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWv5ArIKlUr-SZSm0k3zVIwRS7a7mXjrW4EM7A5QO2Ew&s" alt="logo" />
      {auth ? <ul className='nav-ul'>
        <li><Link to='/'>Products </Link></li>
        <li><Link to='/add'>Add Product </Link></li>
        <li> <Link to='/profile'>Profile </Link></li>
        <li><Link onClick={logout} to='/signup'>Logout </Link></li>

      </ul>
        : <ul className='nav-ul nav-right'>
          <li><Link to='/signup'>Sign up</Link></li>
          <li> <Link to='/login'>Login </Link></li>
        </ul>
      }
    </div>
  )
}

export default Nav;