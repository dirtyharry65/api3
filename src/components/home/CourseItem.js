import React, { useContext } from 'react';
import CoursesContext from '../../context/courses/coursesContext';

const CourseItem = props => {

const { course } = props;
const coursesContext = useContext( CoursesContext );
const { getCourse, getAPICourse , currentCourseID } = coursesContext;

const getDetail = () => {
  getAPICourse( ( course.course_id ) ? course.course_id : course.id );
}

if( course ){
  const id = ( course.course_id ) ? course.course_id : course.id; 
  return (
    <li className={`course_grid-item${currentCourseID === id ? ' active' : '' }`} id={ id } onClick={ getDetail }>
      <h4>{ course.name} ({course.acf.aantal_videos})</h4>
    </li>
  )
} else {
  return (
    <div>
      Laden...
    </div>
  )
}
  
}

export default CourseItem;
