import React from 'react'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }


  return (
    <div>
      <button onClick={logOut}>Log Out</button>
    </div>
  )
}

export default Navbar
