import React, { useReducer  } from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';
import {
  USER_LOADED,
  LOGIN_URL,
  ADMIN_LOADED,
  NOT_LOGGED_IN,
  WAS_LOGGED_IN,
  REGISTER_FAIL,
  RESOURCE_URL,
  LOGOUT,
  SET_LOADING
} from '../types';

const AuthState = props => {
  
   //Set State
   const initialState = {
     session: null , // JSON.parse(localStorage.getItem('session'))
     isAuthenticated: false,
     loading: false,
     error: null,
     user: null,
     subscriptions: null,
     totalSubscriptions : 0,
     currentSubscription : null,
     registrationCode : null,

  }

  // Connect to Reducer
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Cookie getters / setters 
  const getCookie = (cname) => {
      var name = cname + "=";
      var ca = document.cookie.split(';');
          // console.log( ca );
      for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
    return null;
  }

  // set cookie
  const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  } 

  // Delete Cookie:
  const deleteCookie = ( cname:String ) => {
    document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  } 

const hasToken = async () => {
  if(  localStorage && localStorage.getItem('userData') && localStorage.getItem('session') ){
    dispatch( { type: SET_LOADING });
    const token  = JSON.parse(localStorage.getItem('session') );
    const results = await fetch( LOGIN_URL+'/validate' ,{ method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8', 'authorization': 'Bearer ' + token.token } } );
    const jsonRes = await results.json();
    dispatch( { type: SET_LOADING , payload: false });
    if ( jsonRes.data.status === 200 ) {
      console.log('Token still valid '+token , jsonRes);
      setUserData( token )
      return true;
    }
  }
  return false;
}

  // check Registration 

  const checkRegistration = async data => {
console.log('Check registration');
    const path = `${RESOURCE_URL}/wp-admin/admin-ajax.php`;
    try {
      const response = await fetch( path, { method: 'POST', body: data } );
      const jsonRes = await response.json();
      console.log( jsonRes );
      if ( jsonRes.success ) {
        dispatch({
          type: USER_LOADED,
          payload: jsonRes.data
        })
      } else {
        dispatch({ 
          type: REGISTER_FAIL , 
          payload : jsonRes.data
        })
      }
     
    } catch (error) {
      dispatch({ 
        type: REGISTER_FAIL , 
        payload : error
      })
    }
  }

// Helper function
  const checkedForErrors = data => {
    if (data.data) {
      return ( ( data.data.status && ( data.data.status === 403 || data.data.status === 404 ) ) ? false: true );
    }
    return true;    
  }

  //load User
  const loadAdmin = async data => {
    console.log('Load Admin');
    dispatch({ type: SET_LOADING });
    const res = await fetch(LOGIN_URL, { method: 'POST', body: data, });
    const jsonRes = await res.json();
    setUserData( jsonRes );
  }

  // set user data
  const setUserData = async data =>{
    if (checkedForErrors(data)) {
      try {
        const url = RESOURCE_URL + '/wp-json/wp/v2/users/' + data.user_id;
        const results = await fetch( url ,{ headers: { 'Content-Type': 'application/json; charset=utf-8', 'authorization': 'Bearer ' + data.token } } );
        const userRes = await results.json();  
        if (checkedForErrors(userRes)) {
          dispatch({ type: ADMIN_LOADED, payload: userRes });
          localStorage.setItem('session', JSON.stringify(data));
        } else {
          localStorage.clear();
          dispatch({ type: REGISTER_FAIL, payload: userRes });
        }
      } catch (e) {
       
        localStorage.clear();
        dispatch({ type: REGISTER_FAIL, payload: e });
      }
    } else {
      localStorage.clear();
      dispatch({ type: REGISTER_FAIL, payload: data });
    }
  }
  // Logout
  const logOut = () => {
    dispatch({ type: LOGOUT });
  };
  // check for previous login
  const isLoggedIn = () => {
    if ( localStorage && localStorage.getItem('userData') && localStorage.getItem('session')  ) {
      dispatch({ type: WAS_LOGGED_IN  })
    } else {
      dispatch({ type: NOT_LOGGED_IN });
    }
    
  }

  // Clear Errors

  // Return State Component
  return (
    <AuthContext.Provider
      value={{
        //
        // state objects
        //
        session: state.session,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        subscriptions: state.subscriptions,
        user : state.user,
        error: state.error,
        total : state.total,
        //
        // functions
        //
        checkRegistration,
        hasToken,
        getCookie,
        setCookie,
        deleteCookie,
        isLoggedIn,
        logOut,
        loadAdmin
      }} >
      {props.children}
    </AuthContext.Provider>
  )

}
export default AuthState;