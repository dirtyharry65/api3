import React, { useContext, useEffect, useState } from 'react';
import {  Redirect } from "react-router-dom";
import CoursesContext from '../../context/courses/coursesContext';
import AuthContext from '../../context/auth/authContext';
import CourseItem from './CourseItem';
import Spinner from '../layout/spinner';
import './home.css';
import CourseDetail from './CourseDetail';

const Home = props => {

  const coursesContext = useContext( CoursesContext );
  const authContext = useContext( AuthContext );
  const { courses, getCourses, getAPICourses, currentCourse , currentCourseID, setCourses, loading } = coursesContext;
  const { isAuthenticated } = authContext;
  const [ filteredText , setFilteredText ] = useState('');
  const [ filteredList, setFilteredList ] = useState([]);
 


  useEffect( () => {
    if (!courses ) {
      console.log('no COurses');
      getCourses();
    } else {
      setFilteredList(courses);
    }
    // eslint-disable-next-line
  }, [courses ]);


  const filterCourses = e => {
    var filter = e.target.value;
    setFilteredText(filter);
    setFilteredList( courses.filter( item => { return item.name.toLowerCase().search( filter.toLowerCase()) !== -1; }) );
  }

  const doUpdate = e => {
    setCourses( courses );
  }

  const getTheCourses = e => {
    getAPICourses();
  }
if( isAuthenticated){
   return (
    <main className="courses-grid">
      <aside className="left-panel">
        <aside className="filter_bar">
          <input type="text" id="filter_courses" onChange={filterCourses} className="filter_courses" value={filteredText} placeholder="zoek cursus"/>
          <button className="btn" onClick={doUpdate}>Update Lijst op API</button>
          <button className="btn" onClick={getAPICourses}>Haal Lijst op API</button>
        </aside>
         <ol className="course_list">
          { filteredList.map((course, id) => { return <CourseItem course={course} key={id} />})  }
         </ol>
      </aside>
      <section className="course_structure">
        <CourseDetail currentCourse={ currentCourse } currentCourseID={currentCourseID} />
      </section>
      { loading ? <Spinner /> : null}
    </main >
  )
}else {
  return <Redirect to='/' />
}
  
}
export default Home;