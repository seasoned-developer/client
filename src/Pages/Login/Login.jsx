import React, { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom';
import { setLogin } from '../../Redux/index';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './index.css';

const Login = () => {
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
      username     : "", 
    password  : ""   
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const HandleChange = (e)=> {
    setError(false);
    setError2(false);
    setError3(false);
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
    if(data.username === "" || data.password === ""){
      setError3(true);
    } 
    else{
      try{
        setLoader(true);
        const resp = await axios.post('https://server-e79y.onrender.com/allroutes/login',data);
        if(resp.status === 200){
          const resp2 = await axios.get(`https://server-e79y.onrender.com/allroutes/user/${resp.data._id}`, {
            headers : {
              Authorization : `Bearer ${resp.data.token}`
            }
          });
          if(resp2.status === 200){
            
              dispatch(
                setLogin(
                  {
                    token : resp.data.token, 
                    user  : resp2.data,  
                  }
                )
              );
              setLoader(false);
              navigate('/')
              navigate(0);
          }
          else if(resp2.status === 206){
            setError2(true);
          }
          else{
            setError(true);
          }
        }
        else{
          setLoader(false);
          setError(true);
        }
      }
      catch(er){
        setLoader(false);
        setError2(true);
        console.log(er.message);
      } 
    }
  }
  return (
    <form className="containerLogin " onSubmit={handleSubmit} >
        <h3>Sign In</h3>
        <div className={error2 ? "error2 showerror2":'error2'}>
          Account already loggedin in another device. 
        </div>   
        <div className={error ? "error2 showerror2":'error2'}>
          Invalid Credentials.
        </div>
        
        <div className={error3 ? "error2 showerror2":'error2'}>
          Empty Fields
        </div>
        <input placeholder='Email Address' disabled={loader} type="text" name='username'  onChange={HandleChange} />
        <input placeholder='Password' disabled={loader} type="password" name='password' onChange={HandleChange}  />
        <button className={loader ? "NoPOINTER" : null} type='submit' disabled={loader}>Login</button>
     
        <div className={loader ? "error2 hdqf showerror2":'error2 hdqf'}>
          Login Process...
        </div>
        <div className={"error2 zdqj showerror2"}>
          No account ? &nbsp;<Link to='/register' className='noacc'>Sign Up</Link>
        </div>
    </form>
  )
}

export default Login