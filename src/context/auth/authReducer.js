import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  WAS_LOGGED_IN,
  NOT_LOGGED_IN,
  LOGIN_FAIL,
  LOGIN_ERROR,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  // REGISTER_USER,
  LOGOUT,
  ADMIN_LOADED,
  SET_LOADING
} from '../types';

const AuthReducer = (state, action) => {
  let user;
  let session;
  let subscriptions, totalSubscriptions, courses, coursesArray;
  let currentSubscription;
  switch (action.type) {
    case USER_LOADED:
      user = action.payload.registration.userobject;
      session = action.payload.registration.session;
      courses = action.payload.registration.courses;
      totalSubscriptions = action.payload.registration.total;
      coursesArray = courses.split(',');
      subscriptions = coursesArray;
      localStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('session', JSON.stringify(session));
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: user,
        subscriptions: subscriptions,
        total: totalSubscriptions,
        currentSubscription :currentSubscription,
        error : null
      }
    case ADMIN_LOADED:
      user = action.payload;
      user.roles = Array.isArray( user.roles ) ? user.roles = user.roles[0] : user.roles ;
      localStorage.setItem('userData', JSON.stringify(user));
      return {
        ...state,
        isAuthenticated : true,
        user: user,
        subscriptions: null,
        currentSubscription : null,
        loading: false,
        error : null
      }
    case LOGIN_SUCCESS:
      user = action.payload.registration.userobject;
      session = action.payload.registration.session;
      subscriptions = action.payload.registration.subscriptionmeta;
      localStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('session', JSON.stringify(session));
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
      return {
        ...state,
        isAuthenticated: true,
        user: user,
        subscriptions: subscriptions,
        loading: false,
        error : null
      }
    case LOGOUT:
      localStorage.removeItem('userData');
      localStorage.removeItem('session');
      localStorage.removeItem('subscriptions');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null,
        subscriptions: null,
        currentSubscription : null
      }
    case NOT_LOGGED_IN:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: null,
        user: null,
        subscriptions: null,
      }
    case WAS_LOGGED_IN:
      const userData = JSON.parse( localStorage.getItem( 'userData' ) )
      let subs = [];
      if (localStorage.getItem("subscriptions") !== null) {
        subs = JSON.parse(localStorage.getItem('subscriptions'));
      }
      return { 
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
        user: userData,
        subscriptions: subs
      }
    case LOGIN_FAIL:
    case LOGIN_ERROR:
    case AUTH_ERROR:
    case REGISTER_FAIL:
      localStorage.removeItem('session');
      localStorage.removeItem('userData');
      localStorage.removeItem('subscriptions');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
        user: null,
        subscriptions: null
      }
      case SET_LOADING:
        return {
          ...state,
          loading: action.payload ? action.payload : true,
          error: null
        }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
}
export default AuthReducer;