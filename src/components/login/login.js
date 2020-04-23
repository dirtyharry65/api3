import React, {  useContext, useEffect, useState } from 'react';
import {  Redirect } from "react-router-dom";
import AuthContext from '../../context/auth/authContext';
import './login.css';
import Spinner from '../layout/spinner';
import { LOGIN_URL } from '../../context/types';
 // import { PlayArrowIcon }  from '@material-ui/icons/';
//import Button from '@material-ui/core/Button';
// import MaterialIcon from '@material/react-material-icon';
const Login = () => {

  const authContext = useContext(AuthContext);
  const {  loadAdmin , error, userError, getCookie , setCookie, deleteCookie, loading, isAuthenticated, hasToken } = authContext;
  
  const [ user , setUser ] = useState("");
  const [ pass , setPass ] = useState("");
  const [ isSaved , setIsSaved ] = useState( false );

  useEffect( ()=>{ 
    if( !isAuthenticated) {
      //user is not authenticated, check for token and if it is still Valid
      validateToken();
      
    }
    if( getCookie('user') && getCookie('pass')){
      setUser(getCookie('user'));
      setPass(getCookie('pass'));
      setIsSaved( !isSaved );
    }
      // eslint-disable-next-line
  },[getCookie('user')]);

    const onChange = (e) => {
    console.log(e.target.checked)
    setIsSaved( e.target.checked );
  }
  
  const validateToken = () => {
    const token = hasToken();
    if( token) {
          
     
      // const tokenExpires = new Date(token.token_expires*1000 ).getTime();
      // const curTime = new Date().getTime() //+603980000;
      // if( tokenExpires - curTime < 3600000 ) { // less than an hour before expiration, get a new 1.
      //   console.log('get a new token');
      // } else {
      //   console.log( tokenExpires , new Date().getTime());
      //   console.log( 'minValid' , ( tokenExpires - curTime )/1000 );
      // }
    }

  }
  const onPassChange = e => {
    setPass(e.target.value);
  }
  const onUserChange = e => {
    setUser(e.target.value);
  }

  const submitHandler = e => {
    e.preventDefault();
    if( isSaved ) { 
      setCookie( "user" , user , 365 );
      setCookie( "pass" , pass , 365 );
    } else { 
      deleteCookie( "user" );
      deleteCookie( "pass" );
    };
    const data = new FormData(e.target);
    loadAdmin(data);
  }

  let errorMsg = "";
  if (userError) {
    console.log(userError);
    switch (userError.code) {
      case '[jwt_auth] invalid_username':
        errorMsg = 'Gebruikersnaam onbekend';
        break;
      case '[jwt_auth] incorrect_password':
        errorMsg = "Wachtwoord incorrect";
        break;
      default:
        errorMsg = userError.code;
    }
  }
  if (error) {
  console.log(error);
    switch (error.code) {
      case 'rest_user_invalid_id':
        errorMsg = 'Gebruikersnaam staat niet geregistreerd';
        break;
      case '[jwt_auth] invalid_username':
          errorMsg = 'Gebruikersnaam onbekend';
          break;
      case '[jwt_auth] incorrect_password':
          errorMsg = "Wachtwoord incorrect";
          break;
      default:
        errorMsg = error.message;
    }
  }

if(isAuthenticated){
   return <Redirect to='/dashboard' />
} else {
  return (
    <div className="login__window">
      <section className="form">
        <header className="course__header"><h2>Login </h2></header> 
      { userError  ? <div className="error">{errorMsg}</div> : "" }
        { error  ? <div className="error">{errorMsg}</div> : "" }
       
      <form onSubmit={ submitHandler }> 
       <section className="form__item" >
            <label htmlFor="username">Gebruikersnaam</label>
            <input id="username" name="username" onChange={onUserChange} required type="text" value={ user } />
          </section>
          <section className="form__item">
            <label htmlFor="password">Wachtwoord</label>
            <input id="password" name="password" onChange={onPassChange} required type="password" value={pass}/>
          </section>
          <section className="form__item" >
            <button className="btn" >Inloggen</button>
            <label htmlFor="remember" className="checkbox_label">
              <input className="checkbox" type="checkbox" id="remember" onChange={ onChange } checked={isSaved}/> Onthoud mij
              <span className="checkmark"></span>
            </label>
        </section>
        {loading ? <Spinner /> : null }
      </form>
      </section>
      
    </div>
  )
}
  
}

export default Login
