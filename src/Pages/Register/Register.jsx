import React, { useState } from 'react'
import './index.css';
import axios from "axios";
import {useNavigate, Link} from 'react-router-dom';


const Register = () => {
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [data, setData] = useState({
    fullName : "", 
    username     : "", 
    password  : "",   
  });
  const navigate = useNavigate();

  const HandleChange = (e)=> {
    setError3(false);
    setError2(false);
    setError(false);
    setData({
      ...data, 
      [e.target.name] : e.target.value
    })
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setError3(false);
    setError2(false);
    setError(false);
    if(data.username === "" || data.password === "" ||  data.fullName === ""){
      setError3(true);
    } 
    else{
      try{
        setLoading(true);
        const resp = await axios.post('https://server-e79y.onrender.com/allroutes/register',data);
        if(resp.status === 200){
          navigate('/login');
        }
        else{
          setError(true);
          alert('Error');
        }
      }
      catch(er){
        setError2('true');
        console.log(er.message);
      } finally{
        setLoading(false);
      }
    }
  }
  return (  
    <form className='containerRegister' onSubmit={handleSubmit} >
      <h3>Sign Up</h3>
      <div className={error2 ? "error2 showerror2":'error2'}>
        Server Error
      </div>   
      <div className={error ? "error2 showerror2":'error2'}>
        Invalid Credentials.
      </div>
      <div className={error3 ? "error2 showerror2":'error2'}>
        Empty Fields
      </div>
            <p>N.B : I did not pay for hosting, so it may be extremely slow, Thank your for your interest in my portfolio..</p>

      <input placeholder='Full Name' type="text" name='fullName' onChange={HandleChange}  disabled={loading} />
      <input placeholder='Email Address' type="text" name='username'  disabled={loading}  onChange={HandleChange} />
      <input placeholder='Password'  disabled={loading} type="password" name='password' onChange={HandleChange}  />
      <button className={loading && "NoPOINTER"} type='submit' disabled={loading}>Register</button>
      
      <div className={loading ? "error2 hdqf showerror2":'error2 hdqf'}>
        Registration Process...
      </div>
      <div className={"error2 zdqj showerror2"}>
        Already an account ? &nbsp;<Link to='/login' className='noacc'>Sign In</Link>
      </div>
    </form>
  )
}

export default Register
