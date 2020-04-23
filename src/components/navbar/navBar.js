import React, {useContext } from 'react';
import {  Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';


const NavBar = (props) => {

const authContext = useContext(AuthContext);

const { isAuthenticated , logOut } = authContext;

const doLogOut = (e) => {
  logOut();
  // <Redirect to='/'/>
}


  return (
    <div>
     
        <Link className="btn" to="/dashboard">Scholen</Link>
        <Link className="btn" to="/cursussen">Cursussen</Link>
     
      { isAuthenticated ? <button className="btn" onClick={doLogOut}>Logout</button> : <Link className="btn" to="/">Login</Link> }
    </div>
  )

}
export default NavBar;