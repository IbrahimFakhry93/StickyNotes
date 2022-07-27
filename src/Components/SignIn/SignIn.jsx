import Axios from 'axios'
import styles from './SignIn.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { React, useState, useEffect } from 'react'
import Joi from 'joi';

export default function SignIn(props) {
  let navigate=useNavigate();
  const[loading,setLoading]=useState(false);
  const [errorList,setErrorList]=useState([]);
  const[error,setError]=useState("");
 // let errorList;
    const[user,setUser]=useState({
        email:'',
        password:'', 
    })

  function getUser(e){
    // Question:
//     let myUser=[...user]
//    myUser[e.target.name]=e.target.value;
//    setUser(myUser);
        setErrorList([]);
        setError("");
        user[e.target.name]=e.target.value;
        setUser(user);
  }

 async function submitForm(e){
       e.preventDefault(); 
       let x = validateForm();
       console.log(x);
       if(x.error){
       setErrorList(x.error.details);
       }
       else{
        setErrorList([]);
        setLoading(true);
       let {data}= await Axios.post("https://route-egypt-api.herokuapp.com/signin",user);
       console.log(data);
       if(data.message ==="success"){
        setError("");
        setLoading(false);
        localStorage.setItem("User Token",data.token);
        props.decodeToken();
        navigate("/home");
       }
       else{
        setLoading(false);
           setError(data.message);
       }
       }
  }
  function validateForm(){
    const schema = Joi.object({
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
      
         <input type="email" className="form-control mb-3" name="email" onChange={getUser} placeholder='Enter Email'></input>
         {error?.includes("email")?<div className="alert alert-danger p-1 w-50">{error}</div>:""}
         {errorList?errorList.map((obj,i)=>obj.message.includes('"email" must be a valid email')?<div key={i} className="alert alert-danger p-1 w-50">valid email required</div>:obj.message.includes('"email" is not allowed to be empty')?<div key={i} className="alert alert-danger p-1 w-50">Email is required</div>:""):""}
         <input type="password" className="form-control mb-3" name="password" onChange={getUser} placeholder='Enter Password'></input>
         {error?.includes("password")?<div className="alert alert-danger p-1 w-50">{error}</div>:""}
         {errorList?.map((obj,i)=>obj.message.includes("password")?<div key={i}  className="alert alert-danger">Password Invalid</div>:"")}
         <button type="submit" className="w-100 btn btn-secondary  py-2 text-white">Sign in</button>
        </form>
        </div>
    </div>
    </>
  )
}