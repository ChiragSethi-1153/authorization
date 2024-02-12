import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


const Login = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
      email: "",
      password: ''
    });
  
  function handelChange(e) {
   
  
    setInputs(prev => ({...prev, 
      [e.target.name]: e.target.value
      
    }))
  }
  const token = localStorage.getItem('token')
  const sendRequest = async () => {
    const res = await axios.post(`http://localhost:8080/users/login`,
    {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }
    ).catch(err => console.log(err));
    const data = await res.data.user;
    const token = await res.data.token;
    localStorage.setItem('token', JSON.stringify(token))
    console.log(data)
    return data
  }


  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log(inputs)
  
    sendRequest()
    //send http request
    
  
  }

  useEffect(() => {
    console.log(token)
  if(token){
    navigate('/')  
  }
    else{
      navigate('/login')
    }
  }, [navigate, token])
  
     return (
       <div>
         <div>
          <form onSubmit={handleSubmit}>
            <br />
          
          <input 
          name='email'
          value={inputs.email} 
          placeholder='enter email' 
          type ='text'
          onChange={handelChange}
           /> 
           <br /> <br />
          <input 
          name='password'
          value={inputs.password} 
          placeholder='enter password' 
          type= 'text' 
          onChange={handelChange}
          /> 
          <br /> <br />
          <button type='submit' >Login</button>
          </form>
         </div>
       </div>
     )
   }

export default Login
