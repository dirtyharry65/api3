import React, { useReducer } from 'react';
import CoursesReducer from './coursesReducer';
import CoursesContext from './coursesContext';
import { API_URL, GET_COURSES,  SET_LOADING, SET_COURSE, RESOURCE_URL, UPDATE_COURSE  } from '../types';

const CoursesState = (props) => {

  //Set State
  const initialState = {
    courses: null,
    loading: false,
    currentCourse: [],
    currentCourseID : null,
    currentIndex: 0,
    currentMeta: null,
  }
     // Connect to Reducer
  const [state, dispatch] = useReducer(CoursesReducer, initialState);



   // Get Courses

  const getCourses = async (data) => {
    console.log('getCourses');
    setLoading();
    const timestamp= new Date().getTime();
    const results = await fetch(API_URL+'?per_page=100&t='+timestamp )
    const jsonRes = await results.json();
    localStorage.setItem('courses', JSON.stringify(jsonRes));
    dispatch({
      type: GET_COURSES,
      payload: jsonRes
    });
  }

  // get single Course from 
  const getCourse = async (courseId, videoId) => {
    setLoading();
    const results = await fetch(API_URL +'/'+ courseId );
    const json = await results.json();
    const obj = { 'course': json, 'courseId': courseId, 'videoId': videoId } ;
    dispatch({ type: SET_COURSE, payload: obj });
  }
  // get single Course from API3

  const getAPICourse = async (courseId, videoId) => {
    setLoading();
    const path = RESOURCE_URL + '/wp-json/hot/v2/courses/'+courseId;
    const session = JSON.parse(localStorage.getItem('session'));
    const results = await fetch( path , { headers: { 'Content-Type': 'application/json; charset=utf-8', 'authorization': 'Bearer ' +  session.token } } );
  const resJson = await results.json();
    console.log(resJson);
  //  dispatch( { type: SET_LOADING , payload : false } )
    const obj = { 'course': resJson, 'courseId': courseId, 'videoId': videoId } ;
    dispatch({ type: SET_COURSE, payload: obj });
  }

  const getAPICourses = async () => {
    setLoading();
    const path = RESOURCE_URL + '/wp-json/hot/v2/courses';
    const session = JSON.parse(localStorage.getItem('session'));
    const results = await fetch( path , { headers: { 'Content-Type': 'application/json; charset=utf-8', 'authorization': 'Bearer ' +  session.token } } );
    const resJson = await results.json();
    console.log(resJson);
    dispatch({
      type: GET_COURSES,
      payload: resJson.data
    });
    // const obj = { 'course': json, 'courseId': courseId, 'videoId': videoId } ;
    // dispatch({ type: SET_COURSE, payload: obj });
  }

  //save all coursesList
  const setCourses =  async( courses) => {
    setLoading();
    const path = RESOURCE_URL + '/wp-json/hot/v2/courses/1';
    const session = JSON.parse(localStorage.getItem('session'));
    var data = stripHtml(courses);
      const response = await fetch( path, {
          method      : 'POST',
          headers     : { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', 'authorization': 'Bearer ' +  session.token },
          body: 'meta=' + JSON.stringify( data ) 
      })
      const resJson = await response.json();
       dispatch({ type: UPDATE_COURSE, payload: resJson });
  }
  //save 1 course
  const setCourse =  async( courseId , currentCourse ,total ) => {
    setLoading();
    const path = RESOURCE_URL + '/wp-json/hot/v2/courses/'+courseId;
    const session = JSON.parse(localStorage.getItem('session'));
    var data = stripSingleHtml(currentCourse);
    console.log(courseId , currentCourse );
      const response = await fetch( path, {
          method      : 'POST',
          headers     : { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', 'authorization': 'Bearer ' +  session.token },
          body: 'meta=' + JSON.stringify( data ) +'&total='+total
      })
      const resJson = await response.json();
       dispatch({ type: UPDATE_COURSE, payload: resJson });
  }
  //Set Loading
  const setLoading = () => dispatch( { type: SET_LOADING } );

  const stripHtml = ( allCourses ) => {
    allCourses.forEach(element => {
      if(element.name ){
        let name = element.name.toString().split('&amp;').join('en');
        element.name = name;

      }
      if(element.acf.info ){
        let inf = element.acf.info.toString();
        inf = inf.split('&#8217;').join("’");
        inf = inf.split('&#8216;').join("‘");
        inf = inf.split('&nbsp;').join("<br>");
        inf = inf.split('&#8230;').join("…");
        inf = inf.split('&amp;').join("en");
        inf = inf.split('&#8220;').join("“");
        inf = inf.split('&#8221;').join("”");
        element.acf.info = inf;
      }
    });
    return allCourses;
  }
  const stripSingleHtml = ( course ) => {
      if(course.name ){
        let name = course.name.toString().split('&amp;').join('en');
        course.name = name;
      }
      if(course.acf.info ){
        let inf = course.acf.info.toString();
        inf = inf.split('&#8217;').join("’");
        inf = inf.split('&#8216;').join("‘");
        inf = inf.split('&nbsp;').join("<br>");
        inf = inf.split('&#8230;').join("…");
        inf = inf.split('&amp;').join("en");
        inf = inf.split('&#8220;').join("“");
        inf = inf.split('&#8221;').join("”");
        course.acf.info = inf;
      }
      if( course.chapters ){
        let chapters = course.chapters;
       
        Object.keys(chapters).forEach( chapter => { 
          let chap  = chapters[chapter];
          console.log(chap);
           chap.data.name = chap.data.name.toString().split('&amp;').join('en');
          let videos  = chap.video;
            Object.keys(videos).forEach( video => { 
             // let vid  = videos[video];
             videos[video].meta.transcriptie = videos[video].meta.transcriptie.toString().split('&').join('en');
              const oldPost = videos[video].post;
              const newPost = {
                "ID" : oldPost.ID,
                "post_author" : oldPost.post_author,
                "post_title" : oldPost.post_title.toString().split('&').join('en')
              }
              videos[video].post = newPost;
            })
          })
      }
    
    return course;
  }

  return (
     <CoursesContext.Provider
      value={{
        courses: state.courses,
        loading: state.loading,
        currentCourse: state.currentCourse,
        currentCourseID : state.currentCourseID,
        getCourse,
        getAPICourse,
        getAPICourses,
        // clearCourse,
        getCourses,
        setCourses,
        setCourse
      }} >
      {props.children}
    </CoursesContext.Provider>
  )
  
}


export default CoursesState;