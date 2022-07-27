import './App.css';
import { React, useState, useEffect } from 'react';
import { Route,Routes, Navigate, useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import NavBar from './Components/NavBar/NavBar';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';


export default function App() {
  let navigate=useNavigate();
  const [userToken,setuserToken]=useState("");

  function decodeToken(){
    let encodedToken=localStorage.getItem("User Token");
    let decodedToken=jwtDecode(encodedToken);
    console.log(decodedToken);
    setuserToken(decodedToken);
  }

  function ProtectRoute(props){
       if(localStorage.getItem("User Token")===null){
        return <Navigate to='/signin'/>
      }
       else{
        return props.children;
       }
  }
  function logOut(){
    setuserToken(null);
    localStorage.removeItem('User Token');
    navigate('/login');
  }
  useEffect(()=>{
    if(localStorage.getItem('User Token')){
     decodeToken();
    }
  },[])

  useEffect(()=>{
     console.log(userToken)
  },[userToken])


  return (
    <>
    <NavBar userToken={userToken} logOut={logOut}></NavBar>
    <div className='container py-3'>
    <Routes>
    <Route path='/' element={<ProtectRoute><Home/></ProtectRoute>}></Route>
    <Route path='home'  element={<ProtectRoute><Home/></ProtectRoute>}></Route>
    <Route path='signup' element={<SignUp />}></Route>
    <Route path='signin' element={<SignIn decodeToken={decodeToken} />}></Route>
    <Route path='*' element={<NotFound/>}></Route>
    </Routes>
    </div>
    </>
   
  );
}


