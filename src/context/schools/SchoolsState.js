import React, { useReducer } from 'react';
import { RESOURCE_URL, GET_SCHOOLS, GET_SCHOOL, GET_SCHOOL_ID, GET_GROUP, GET_GROUP_ID, SET_LOADING } from '../types';
import SchoolsReducer from './schoolsReducer';
import SchoolsContext from './schoolsContext';


const SchoolsState = (props) => {

   //Set State
  const initialState = {
    schools: [],
    totalViews : 0,
    currentSchool : [],
    currentSchoolID : null,
    currentSchoolTotal : 0,
    currentGroup : [],
    currentGroupID :  null,
    loading: false,
   
  }
     // Connect to Reducer
  const [state, dispatch] = useReducer(SchoolsReducer, initialState);

  // Get Schools

  const getSchools = async (data) => {
    dispatch({ type : SET_LOADING });
    console.log('Schools');
    // setLoading();
    const path = RESOURCE_URL + '/wp-json/hot/v2/schools/';
    const session = JSON.parse(localStorage.getItem('session'));
    const results = await fetch( path , {
          headers     : { 'Content-Type': 'application/json; charset=utf-8', 'authorization': 'Bearer ' +  session.token }
      } );
    const jsonRes = await results.json();
    dispatch({
      type: GET_SCHOOLS,
      payload: jsonRes
    });
  }

  const getSchool = async (id) => {
    dispatch({ type : GET_SCHOOL_ID , payload : id });
    console.log('School');
    dispatch({ type : SET_LOADING });
    // setLoading();
    const path = RESOURCE_URL + '/wp-json/hot/v2/schools/'+id;
    const session = JSON.parse(localStorage.getItem('session'));
    const results = await fetch( path , {
          headers     : { 'Content-Type': 'application/json; charset=utf-8', 'authorization': 'Bearer ' +  session.token }
      } );
    const jsonRes = await results.json();
    dispatch({
      type: GET_SCHOOL,
      payload: jsonRes
    });
  }

const getGroup = async (id) => {
   dispatch( {
      type: GET_GROUP_ID , 
      payload : id
    })
      dispatch({ type : SET_LOADING });
   const path = RESOURCE_URL + '/wp-json/hot/v2/schools/'+state.currentSchoolID+'/'+id;
    const session = JSON.parse(localStorage.getItem('session'));
    const results = await fetch( path , {
          headers     : { 'Content-Type': 'application/json; charset=utf-8', 'authorization': 'Bearer ' +  session.token }
      } );
    const jsonRes = await results.json();
    dispatch( {
      type: GET_GROUP , 
      payload : jsonRes.data
    })
}


  // Return the state
   return (
     <SchoolsContext.Provider
      value={{
        schools: state.schools,
        totalViews : state.totalViews,
        currentSchool : state.currentSchool,
        currentSchoolID : state.currentSchoolID,
        currentSchoolTotal : state.currentSchoolTotal,
        currentGroup : state.currentGroup,
        currentGroupID : state.currentGroupID,
        loading: state.loading,
        getSchools,
        getSchool,
        getGroup
      }} >
      {props.children}
    </SchoolsContext.Provider>
  )
}

export default SchoolsState;