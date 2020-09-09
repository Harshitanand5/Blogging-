import React from 'react';
import {Link,useHistory} from 'react-router-dom';
const Navbar=()=>{
  const history=useHistory()
    return(
        <nav>
    <div className="nav-wrapper white">
      <Link  to="/" className="brand-logo">Iblogger</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/signin">Signin</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/create">Create Post</Link></li>
        <li> <button className="btn waves-effect waves-light #64b5f6  red darken-1" 
        onClick={()=>{
          localStorage.clear()
          history.push('/signin')
        } } >Logout</button></li>
      </ul>
    </div>
  </nav>
    )
}

export default Navbar;
