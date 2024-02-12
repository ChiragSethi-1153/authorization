import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

// axios.defaults.withCredentials =true
// let firstRender = true;

const Home = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate()
  // const refreshToken = async () => {
  //   const res = await axios.get("http://localhost:5000/api/refresh", {
  //     withCredentials: true
  //   }).catch((err) => console.log(err))

  //   const data = await res.data;
  //   return data;
  // } 

 const token =  localStorage.getItem('token')

  const sendRequest = async () => {
    const res = await axios.get('http://localhost:8080/users/user').catch(err => console.log(err))

    const data = await res.data
    return data

  }
  useEffect(() => {
    if(token){
    sendRequest().then((data) => setUser(data.user))
  }
  else{
    navigate('/login')
  }
  // let interval = setInterval(() => {
  //   refreshToken().then(data => setUser(data))
  // },1000 * 29)

  // return () => clearInterval(interval);
}, [navigate])
   
  

  return (
    <div>
      <Navbar />
      Welcome {user && user.name}
    </div>
  )
}

export default Home
