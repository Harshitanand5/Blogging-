import React,{useState} from 'react';
import{Link,useHistory} from 'react-router-dom';
import M from "materialize-css";

const Signup=()=>{
    const history=useHistory()
    const[name,setName]=useState("")
    const[password,setPassword]=useState("")
    const[email,setEmail]=useState("")
    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return M.toast({html:'Enter valid email',classes:"#d50000 red accent-4"})
        }
        fetch('/signup',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                password:password,
                email:email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error)
            {
                M.toast({html:data.error,classes:"#d50000 red accent-4"})
            }
            else
            {
                M.toast({html:'Saved Sucessfully',classes:"#d50000 green darken-1"})
                history.push('/signin')
            }
        })
    }
    return(
        <div className="mycard">
                <div className="card auth-card input-field">
                        <h2> Iblogger</h2>
                        <input
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        />
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
                        <button className="btn waves-effect waves-light #64b5f6 blue  darken-1" onClick={()=>PostData()}>
                            SignUp</button>
                        <h5>
                            <Link to="/signin">Already have account</Link>
                        </h5>
                </div>
            </div>
        
    )
}

export default Signup;