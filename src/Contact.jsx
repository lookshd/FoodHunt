import React, { useState } from 'react'
import contact from "./images/5124556.jpg";
const Contact = () => {
 const [message,setMessage]=useState(false);
 const handler = (e)=>
 {
    e.preventDefault();

   
    setMessage(true);

 }
    return (
    <div className="Contact-cont">
        <div className="Contact-left">
       <img src={contact}/>
        </div>
        <div className="Contact-right">
            <h1>Contact us</h1>
           <form onSubmit={handler}>
            <input 
            type='text' placeholder='Name' required />
   <input 
            type='email' placeholder='Email' required />
            <textarea placeholder='Type Your Message Here.....' required/>
<button type='submit'> Submit</button>
{message && <span>Thanks for contacting FoodFire, We will reply ASAP.</span>}
      </form>  
        </div>
     

    </div>
  )
}

export default Contact