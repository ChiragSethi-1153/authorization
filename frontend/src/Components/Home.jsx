import axios from 'axios'
import React, { useEffect, useState } from 'react'

axios.defaults.withCredentials =true
let firstRender = true;

const Home = () => {
  const [user, setUser] = useState();

  const refreshToken = async () => {
    const res = await axios.get("http://localhost:5000/api/refresh", {
      withCredentials: true
    }).catch((err) => console.log(err))

    const data = await res.data;
    return data;
  } 


  const sendRequest = async () => {
    const res = await axios.get('http://localhost:5000/api/user', {
      withCredentials: true
    }).catch(err => console.log(err))

    const data = await res.data
    return data

  }
  useEffect(() => {
    if(firstRender){
      firstRender = false;
    sendRequest().then((data) => setUser(data.user))
  }
  let interval = setInterval(() => {
    refreshToken().then(data => setUser(data))
  },1000 * 28)

  return () => clearInterval(interval);
}, [])
   
  

  return (
    <div>
      Welcome {user && user.name}
    </div>
  )
}

export default Home
