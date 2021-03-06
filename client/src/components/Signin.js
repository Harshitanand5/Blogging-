import React ,{useState,useContext}from 'react';
import{Link,useHistory} from 'react-router-dom';
import {UserContext} from "../App"
import M from "materialize-css";
const Signin = () => {
    const {state,dispatch}=useContext(UserContext)
    const history=useHistory()
    const[password,setPassword]=useState("")
    const[email,setEmail]=useState("")
    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return M.toast({html:'Enter valid email',classes:"#d50000 red accent-4"})
        }
        fetch('/signin',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                password:password,
                email:email
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
                localStorage.setItem('jwt',data.token)
                localStorage.setItem('user',JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:'Sucessfully Signin',classes:"#d50000 green darken-1"})
                history.push('/')
            }
        })
    }
    return (
        
            <div className="mycard">
                <div className="card auth-card input-field">
                        <h2> Iblogger</h2>
                        <input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        <input
                        type="text"
                        placeholder="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        <button className="btn waves-effect waves-light #64b5f6  blue darken-1" onClick={()=>PostData()}>
                            Signin</button>
                        <h5>
                            <Link to="/signup">Dont have account?</Link>
                        </h5>
                </div>
            </div>
        
    )
}

export default Signin;