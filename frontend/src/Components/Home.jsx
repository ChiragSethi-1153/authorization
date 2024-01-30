import axios from 'axios'
import React, { useEffect, useState } from 'react'

axios.defaults.withCredentials =true

const Home = () => {
  const [user, setUser] = useState();
  const sendRequest = async () => {
    const res = await axios.get('http://localhost:5000/api/user', {
      withCredentials: true
    }).catch(err => console.log(err))

    const data = await res.data
    return data

  }
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user))
  }, [])
   
  

  return (
    <div>
      Welcome 
      {user && user.name}
    </div>
  )
}

export default Home
