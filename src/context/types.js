// general constants
export const ROOT               = document.getElementById('root')
export const CHECKOUT           = ROOT.dataset.checkout;
export const RESOURCE_URL       = 'https://api3.house-of-training.nl';
export const API_URL            = 'https://house-of-training.nl/wp-json/wp/v2/courses';
export const SITE_TITLE         = 'House of Training';

// Courses Constants
export const GET_COURSES        = 'GET_COURSES';
export const SET_COURSE         = 'SET_COURSE';
export const CLEAR_COURSE         = 'CLEAR_COURSE';
export const UPDATE_COURSE         = 'UPDATE_COURSE';
export const SET_LOADING        = 'SET_LOADING';
// Auth Constants
export const LOGIN_URL          = RESOURCE_URL+'/wp-json/simple-jwt-authentication/v1/token';
export const USER_LOADED        = 'USER_LOADED';
export const ADMIN_LOADED       = 'ADMIN_LOADED';
export const AUTH_ERROR         = 'AUTH_ERROR';
export const LOGIN_SUCCESS      = 'LOGIN_SUCCESS';
export const LOGIN_ERROR        = 'LOGIN_ERROR';
export const NOT_LOGGED_IN      = 'NOT_LOGGED_IN';
export const WAS_LOGGED_IN      = 'WAS_LOGGED_IN';
export const ADMIN_WAS_LOGGED_IN    = 'ADMIN_WAS_LOGGED_IN';
export const LOGIN_FAIL         = 'LOGIN_FAIL';
export const LOGOUT             = 'LOGOUT';
export const CLEAR_ERRORS       = 'CLEAR_ERRORS';
export const REGISTER_FAIL      = 'REGISTER_FAIL';
export const REGISTER_SUCCESS   = 'REGISTER_SUCCESS';

//Schools Constants
export const GET_SCHOOLS  =  'GET_SCHOOLS';
export const GET_SCHOOL  =  'GET_SCHOOL';
export const GET_GROUP  =  'GET_GROUP';
export const GET_GROUP_ID  =  'GET_GROUP_ID';
export const CLEAR_SCHOOL  =  'CLEAR_SCHOOL';
export const GET_SCHOOL_ID  =  'GET_SCHOOL_ID';

