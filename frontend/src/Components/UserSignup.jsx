 import React, {useState} from 'react'
 import { useNavigate } from 'react-router-dom'
import axios from 'axios'


 const UserSignup = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ''
  });

function handelChange(e) {
 

  setInputs(prev => ({...prev, 
    [e.target.name]: e.target.value
    
  }))
}

const sendRequest = async () => {
  const res = await axios.post(`http://localhost:5000/api/signup`,
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
  sendRequest().then(() => navigate('/login'))


}

   return (
     <div>
       <div>
        <form onSubmit={handleSubmit}>
          <br />
        <input 
        name='name'
        value={inputs.name} 
        placeholder='enter name' 
        type='text'
        onChange={handelChange}
         />
         <br /> <br />
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
        <button type='submit' >Submit</button>
        </form>
       </div>
     </div>
   )
 }
 
 export default UserSignup
 

