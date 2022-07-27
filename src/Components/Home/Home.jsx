import axios from 'axios'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { React, useState, useEffect } from 'react'
import Toast from 'react-bootstrap/Toast';
import jwtDecode from 'jwt-decode';
import HomeChild from '../HomeChild/HomeChild'

export default function Home() {
  let token=localStorage.getItem("User Token");
  if(token){
    var decodedToken=jwtDecode(token);
  }
  
  const[noteID,setnoteID]=useState(0);
  const[note,setNote]=useState({
    title:"this is a title", 
    desc:"this is a desc", 
    userID:decodedToken._id,
    token
})

  const[noteList,setNoteList]=useState([{title:"this is a title", 
  desc:"this is a desc", 
  userID:decodedToken._id,
  token}]);
  const[toastNote,setToastNote]=useState(false);
  const[toastUpdateNote,setToastUpdateNote]=useState(false);
  const[deleteAlert,setDeleteAlert]=useState(false);
  const[loading,setLoading]=useState(false);
  const[nosavenotes,setnosavenote]=useState(false);
 

function getNoteID(){

}

 

function getNote(e){
  // other Method:
  //  setNote({...note,[e.target.name]:e.target.value})
    let myNote={...note};
    myNote[e.target.name]=e.target.value;
    setNote(myNote);
}   
  
  async function getNotesAPI(){
    setLoading(true);
    console.log("APIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
    let {data}= await axios.get("https://route-egypt-api.herokuapp.com/getUserNotes",{
      headers:{
      //  token:"ejhsjjkagdkaldjalsslsanshdteks",
      //  userID:"6005c66cfa817d33d436594a"
       //===================
      token,   // from localstorage
        userID:decodedToken._id
      }
    });
   console.log(data);
    if(data.message==="success"){
      console.log(data);
      setLoading(false);
      console.log("======================================")
      console.log(data.Notes);
      setNoteList(data.Notes);
    }
    else if(data.message==="no notes found"){
      setLoading(false);
      setnosavenote(true);
    }
   

   
   
  }
  async function submitForm(e){
     e.preventDefault(); 
    // let notes=[...noteList];
    // note["ID"]=note["ID"]+1;
    // setNoteList((notes)=>{
    //   return setNoteList(notes)
    // })
    // notes.push(note);
    // console.log(notes);
    // setNoteList(notes);
    
    let {data}= await axios.post("https://route-egypt-api.herokuapp.com/addNote",note);
    console.log(data)
    if(data.message==="success"){
      setLoading("false");
      getNotesAPI();
    }
    setToastNote(false);
  }
  async function updateNotes(e,noteObj){
    e.preventDefault();
    console.log(note);
   noteObj["title"]=note.title;
   noteObj["desc"]=note.desc;
    console.log("eafwf");
    console.log(noteObj);
     let {data}= await axios.put("https://route-egypt-api.herokuapp.com/updateNote",noteObj);
     console.log(data);
     if(data.message==="success"){
      setLoading("false");
      setToastUpdateNote(false)
      getNotesAPI();
    }
  }
 async function deleteNotes(ID){
   // let notes=[...noteList];
  //  notes.splice(index,1);
    // notes=notes.filter(note=>note.ID !== ID);
    // console.log(notes);
    // setNoteList(notes);
    // setDeleteAlert(false);
    // setLoading("true");
     let {data} = await axios.delete("https://route-egypt-api.herokuapp.com/deleteNote",{
          data:{
             NoteID:ID,
              token
          }
    });
    console.log(data.message)
    if(data.message==='deleted'){
       setDeleteAlert(false);
      setLoading("false");
      getNotesAPI();
    }
    // console.log(response);
  }
  
  
 
  useEffect(()=>{
    getNotesAPI();
 },[])

useEffect(()=>{
 console.log(note);
},[note])






  


  return (
    
    <>
      {toastNote?<div className="layer position-fixed start-0 top-0 w-100 h-100 bg-opacity-50 bg-black d-flex justify-content-center align-items-center"></div>:""}
     {loading?<div className="layer position-fixed start-0 top-0 w-100 h-100 bg-opacity-50 bg-black d-flex justify-content-center align-items-center">
             <i className="fas fa-spinner fa-spin fs-1 text-white"></i>
        </div>:""}
       {nosavenotes?<div className='position-absolute top-50 start-50 translate-middle bg-light p-3'>
               <i onClick={()=>setnosavenote(false)} className="fa-solid fa-xmark d-block closeMark text-end fs-4"></i>
               <h3 className='text-danger text-center'>OOPS</h3>
               <h2 className="text-center">No pre-saved notes to display</h2>
        </div>:""}
    <div className="d-flex justify-content-end mt-5">
    <button onClick={()=>{setToastNote(true)}} className='btn btn-info p-2 text-white d-flex'>Add Note</button>
     </div>
     <div className="row gy-4 py-5 my-5">
     {noteList.map((obj,i)=><HomeChild ID={obj._id} key={i} index={i} noteObj={obj} updateNotes={updateNotes} deleteNotes={deleteNotes} getNote={getNote} submitForm={submitForm} toastNote={toastNote} toastUpdateNote={toastUpdateNote} deleteAlert={deleteAlert} 
     setToastNote={setToastNote}
     setToastUpdateNote={setToastUpdateNote}
     setDeleteAlert={setDeleteAlert}
     ></HomeChild>)} 
     </div>
    </>
  )
}
