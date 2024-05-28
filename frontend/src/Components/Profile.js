import React from 'react'

const Profile = () => {

  const token = JSON.parse(localStorage.getItem('user'))
  console.log(token);

  return (<>
    <h1>Profile Details</h1>
    <h2>Name: {token.name}</h2>
    <h2>Email: {token.email}</h2>

  </>

  )
}

export default Profile