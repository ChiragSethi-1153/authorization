import React, {useState} from 'react'
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
  
  const sendRequest = async () => {
    const res = await axios.post(`http://localhost:5000/api/login`,
    {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }
    ).catch(err => console.log(err));
    const data = await res.data;
    return data
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log(inputs)
  
    //send http request
    sendRequest().then(() => navigate('/'))
  
  
  }
  
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
