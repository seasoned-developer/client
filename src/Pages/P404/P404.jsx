import React from 'react'
import './index.css';
import {useNavigate} from 'react-router-dom';


const P404 = () => {

  const navigate = useNavigate();

  const ReturnBackHome = ()=>{
    navigate('/');
  } 

  return (
    <div className='P404'>
      <div className="notfound">
        Error 404 | Page not found.
      </div>
      <button
        onClick={ReturnBackHome}
      > 
        <i className='fa-solid fa-arrow-left'></i>&nbsp;Back Home
      </button>
    </div>
  )
}

export default P404