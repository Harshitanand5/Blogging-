import React, { useState } from 'react';
import M from "materialize-css";
import{useHistory} from 'react-router-dom';
const CreatePost=()=>{
  const [title,setTitle]=useState("")
  const [body,setBody]=useState("")
  const history=useHistory()
  const postDetails=()=>{
    fetch('/createpost',{
      method:"post",
      headers:{
          "Content-Type":"application/json",
          "authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
          title:title,
          body:body
      })
  }).then(res=>res.json())
  .then(data=>{
      console.log(data);
      if(data.error)
      {
          M.toast({html:data.error,classes:"#d50000 red accent-4"})
      }
      else
      {
          M.toast({html:'Sucessfully Posted',classes:"#d50000 green darken-1"})
          history.push('/')
      }
  })


  }
    return(
        <div className="card input-filled" style={{margin:"30px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}>
          <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
          <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)}/>
          <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>postDetails()}>
            Submit Post</button>
        </div>
    )
}
export default CreatePost;