import React,{useState,useEffect} from 'react';
import "../App.css";

const Home=()=>{
    const[data,setData]=useState([])
    useEffect(()=>{
      fetch('/allpost',{
          headers:{
            "authorization":"Bearer "+localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
          console.log(result);
          setData(result.posts)
      })
    },[])
    return(
        <div className="home">
            {
                data.map(item=>{
                    return(
                        <div className="card home-card">
                        <h5>{item.postedBy.name}</h5>
                        <div className="card-content">
                         <h4>{item.title}</h4>
                         <p>{item.body}</p>
                        </div>
                    </div>
        
                    )
                })
            }
           
            
        </div>

        
    )
}

export default Home;