import Axios from 'axios'
import styles from './SignUp.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { React, useState, useEffect } from 'react'
import Joi from 'joi';

export default function SignUp(props) {
  let navigate=useNavigate();
  const[loading,setLoading]=useState(false);
  const [errorList,setErrorList]=useState([]);
  const[error,setError]=useState("");
 // let errorList;
    const[user,setUser]=useState({
        first_name:"",
        last_name:'',
        email:'',
        password:'',
        age:''
    })

  function getUser(e){
   
      let myUser={...user}
       myUser[e.target.name]=e.target.value;
       setUser(myUser);
     //  console.log(user);   // there will be lag in log of the change...late by one change
                            // will display the previous change
        setErrorList([]);
        setError("");
  }
  console.log(user);  // sol for log lag problem.

 async function submitForm(e){
       e.preventDefault(); 
       let x = validateForm();
       console.log(x);
       if(x.error){
       setErrorList(x.error.details);
       }
       else{
        setLoading(true);
        setErrorList([]);
       let {data}= await Axios.post("https://route-egypt-api.herokuapp.com/signup",user);
       console.log(data);
       if(data.message ==="success"){
        setError("");
        setLoading(false);   // note: setLoading after Navigate it will cause error because navigate to sign in will cause unmount to sign up
                             // and if set loading after navigate so it will run inside sign up component after it's already unmounted
        navigate("/signin");
       }
       else{
        setLoading(false);
           setError(data.message);
       }
       }
  }
  function validateForm(){
    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(30).required(),
      last_name: Joi.string().alphanum().min(3).max(30).required(),
      age: Joi.number().min(18).max(80).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  })
  return schema.validate(user,{abortEarly:false});
  }
  useEffect(()=>{
    console.log(user);
  },[user])

  return (
  <>
   {loading?<div className="layer position-fixed start-0 top-0 w-100 h-100 bg-opacity-50 bg-black d-flex justify-content-center align-items-center">
             <i className="fas fa-spinner fa-spin fs-1 text-white"></i>
        </div>:""}
      
    <div className='container py-3 d-flex justify-content-center align-items-center mt-5'>
      <div className="item w-50">
        <form onSubmit={submitForm}>
        {/* value={user.first_name} */}
         <div className='d-flex justify-content-between'>
           <input type="text" className="form-control mb-3 select"  name="first_name" onChange={getUser} placeholder='Enter First Name'></input>
           <input type="text" className="form-control mb-3 select" name="last_name" onChange={getUser} placeholder='Enter Last Name'></input>
         </div>
         <div className="d-flex justify-content-between">
         {errorList?errorList.map((obj,i)=>obj.message.includes('"first_name" is not allowed to be empty')?<div key={i} className="alert alert-danger p-1 w-50">first name is required</div>:obj.message.includes('"first_name" must only contain alpha-numeric characters')?<div key={i} className="alert alert-danger p-1 w-50">First Name must contains alphabets and numbers</div>:obj.message.includes('"first_name" length must be at least 3 characters long')?<div key={i} className="alert alert-danger p-1 w-50">First name must be 3 characters at least</div>:""):""}
         {errorList?errorList.map((obj,i)=>obj.message.includes('"last_name" is not allowed to be empty')?<div key={i} className="alert alert-danger p-1 w-50">last name is required</div>:obj.message.includes('"last_name" must only contain alpha-numeric characters')?<div key={i} className="alert alert-danger p-1 w-50">Last Name must contains alphabets and numbers</div>:""):""}
         </div>
         <input type="email" className="form-control mb-3" name="email" onChange={getUser} placeholder='Enter Email'></input>
         {errorList?errorList.map((obj,i)=>obj.message.includes('"email" must be a valid email')?<div key={i} className="alert alert-danger p-1 w-50">valid email required</div>:obj.message.includes('"email" is not allowed to be empty')?<div key={i} className="alert alert-danger p-1 w-50">Email is required</div>:""):""}
         {error?<div className="alert alert-danger p-1 w-50">{error}</div>:""}
         <input type="number" className="form-control mb-3" name="age" onChange={getUser} placeholder='Enter Age'></input>
         {errorList?errorList.map((obj,i)=>obj.message.includes('"age" must be a number')?<div key={i} className="alert alert-danger p-1 w-50">age must be a number</div>:""):""}
         <input type="password" className="form-control mb-3" name="password" onChange={getUser} placeholder='Enter Password'></input>
         {errorList?.map((obj,i)=>obj.message.includes("password")?<div key={i}  className="alert alert-danger">Password Invalid</div>:"")}
         <button type="submit" className="w-100 btn btn-secondary  py-2 text-white">Sign Up</button>
        </form>
        </div>
    </div>
    </>
  )
}

//'"age" must be a number'
