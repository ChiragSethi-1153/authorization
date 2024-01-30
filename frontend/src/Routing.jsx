import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Components/Home'
import UserSignup from './Components/UserSignup'
import Login from './Components/Login'

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/login' Component={Login} />
        <Route path='/signup' Component={UserSignup} />
      </Routes>
      </BrowserRouter>

    </div>
  )
}

export default Routing
