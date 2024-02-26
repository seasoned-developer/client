import React from 'react'
import '../indexDakir.css';

const Website = () => {
  return (
    <div className='Website'>
      <div className="Container">
        <div className="title">
          Bachelor Document Area 
        </div>
        <div className="containerOfInputs2">
          <div className="columnX">
            <div className="nameOfDiv2">
              First Name
            </div>
            <input type="text" placeholder='Your first name' />
          </div>
          <div className="columnX">
            <div className="nameOfDiv2">
              Last Name
            </div>
            <input type="text" placeholder='Your last name'  />
          </div>
        </div>
        <div className="containerOfInputs">
          <div className="nameOfDiv">
            Email Address
          </div>
          <input type="text" placeholder='Your business email address' />
        </div>
        <div className="containerOfInputs">
          <div className="nameOfDiv">
            Linkedin profile link
          </div>
          <input type="text" placeholder='Your linkedin profile link' />
        </div>
        <div className="containerOfInputs">
          <div className="nameOfDiv">
            Portfolio link
          </div>
          <input type="text" placeholder='Your portfolio link if you have one' />
        </div>
        <div className="containerOfInputs">
          <input
            className='dropCvBtn'

            >
            <i class="fa-solid fa-cloud-arrow-down"></i>&nbsp;&nbsp;Drop your CV
          </input>
        </div>
        <div className="containerOfInputs containerOfInputsjidsj">
          By submitting your document, you accept our terms and conditions/privacy 
        </div>
        <div className="containerOfInputsAndButton containerOfInputs containerOfInputsuifzd">
          <button>
            Deliver Documents
          </button>
        </div>
      </div>
    </div>
  )
}

export default Website