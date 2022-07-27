import axios from 'axios'
import styles from './NavBar.module.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { React, useState, useEffect } from 'react'


export default function NavBar(props) {
  return (
    <>
   
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary shadow">
            <div className="container">
            <Link className="navbar-brand ms-2 text-white" to='home' >Notes</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto me-2 mb-2 mb-lg-0">

                <li className="nav-item dropdown">
                    <Link to='signin' className="nav-link dropdown-toggle text-white"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {props.userToken?"Logout":"Login"}
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {props.userToken?<li><Link className="dropdown-item" to="signin" onClick={props.logOut}>Logout</Link></li>:<>
                    <li><Link className="dropdown-item" to="signup" >Sign Up</Link></li>
                    <li><Link className="dropdown-item" to="signin">Sign In</Link></li>
                    </>}
                    </ul>
                </li>
                
                </ul>
            </div>
            </div>
            </nav>
    </>
    
  )
}
