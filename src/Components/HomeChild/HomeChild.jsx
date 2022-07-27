import axios from 'axios'
import styles from './HomeChild.module.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { React, useState, useEffect } from 'react'
import Toast from 'react-bootstrap/Toast';
import $ from 'jquery';

export default function HomeChild(props) {
    
    let{index}=props;
    let{ID}=props;
    let{noteObj}=props;
    console.log("###########################")
    console.log(noteObj);
    let{title,desc,userID,token}=props.noteObj;
    let{setToastNote,setToastUpdateNote,setDeleteAlert,updateNotes,deleteNotes,getNote}=props

   function clearForm(e){
//         let x= document.getElementById("title");
//         console.log("hello clear");
//         console.log(document.getElementById(`${styles.title}`));
//         $('#title').value=props.note.title;
//         $('#textArea').value=props.note.desc;
      }


  return (
  <>
     {props.toastNote?<>
   
    <Toast className="toast position-absolute top-50 start-50 translate-middle">
      <Toast.Header onClick={()=>{setToastNote(false)}} >
        <strong className="me-auto">Title</strong>
      </Toast.Header>
      <Toast.Body className="bg-white">
      <form onSubmit={props.submitForm} >
      <input type="text" className="form-control mb-3" name="title" onChange={getNote} placeholder='Enter Title'></input>
      <textarea type="text-area" className="form-control mb-3" rows="10" name="desc" onChange={getNote} placeholder='Type your Note'></textarea>
      <div className="d-flex justify-content-end">
      <button type="submit" className=" btn btn-primary rounded-2 py-2 text-white mx-2">add</button>
      <button onClick={()=>{setToastNote(false)}} type="submit" className=" btn btn-danger rounded-2 py-2 text-white">cancel</button>
      </div>
     </form>
      </Toast.Body>
    </Toast>
    </>:""}

  
    


    {props.toastUpdateNote?<>
    <Toast className="toast position-absolute top-50 start-50 translate-middle">
      <Toast.Header onClick={()=>{setToastUpdateNote(false)}} >
        <strong className="me-auto">Edit</strong>
      </Toast.Header>
      <Toast.Body className="bg-white">
      <form onSubmit={(e)=>{updateNotes(e,noteObj)}} >
      <input id={styles.title}  type="text" className="form-control mb-3" name="title" onChange={getNote} placeholder='Enter Title'></input>
      <textarea id="textArea" type="text-area" className="form-control mb-3" rows="10" name="desc" onChange={getNote} placeholder='Type your Note'></textarea>
      <div className="d-flex justify-content-end">
      <button type="submit" className=" btn btn-primary rounded-2 py-2 text-white mx-2">add</button>
      <button onClick={()=>{setToastUpdateNote(false)}} type="submit" className=" btn btn-danger rounded-2 py-2 text-white">cancel</button>
      </div>
     </form>
      </Toast.Body>
    </Toast>
    </>:""}

    {props.deleteAlert?<>
    <Toast className="toast position-absolute top-25 start-50 translate-middle-x">
      <Toast.Header onClick={()=>{setDeleteAlert(false)}} >
        <strong className="me-auto">Are you sure?</strong>
      </Toast.Header>
      <Toast.Body className="bg-white">
      <p>Do you really want to delete the note?</p>
      <div className="d-flex justify-content-end">
      <button type="submit" className="btn btn-danger rounded-2 py-2 text-white mx-2" onClick={()=>{deleteNotes(ID)}}>Delete</button>
      <button onClick={()=>{setDeleteAlert(false)}}  className="btn btn-primary rounded-2 py-2 text-white">Cancel</button>
      </div>
     
      </Toast.Body>
    </Toast>
    </>:""}

   <div className="col-md-3">
        <div className="note-item shadow p-4 text-center">
        <div className="dropdown text-end mb-3">
        {/* setToastUpdateNote */}
          <button className="bg-transparent fas fa-ellipsis-v" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          </button>
          <ul className="dropdown-menu p-1" aria-labelledby="dropdownMenuButton1">
            <li className="d-flex justify-content-between align-items-center dropdown-item"  onClick={()=>{setToastUpdateNote(true)}}><span  className="dropdown-item text-primary">Edit</span><i onClick={clearForm} className="fa-solid fa-pen text-primary"></i></li>
            <li className="d-flex justify-content-between  align-items-center dropdown-item"><span className="dropdown-item text-danger" onClick={()=>{setDeleteAlert(true)}}>Delete</span><i className="fa-solid fa-trash-arrow-up text-danger"></i></li>
          </ul>
       
        </div>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
      </div>
  </>
  )
}
