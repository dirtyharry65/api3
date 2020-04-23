import React from 'react';



const Course = props => {


  const {  total , course, courseObj } = props;

  const divStyle = {
   
    width:  (course.total/total)*100+ '%',
    
  };
  return (
    <div>
      <span className="progressbar-container"><span className="progressbar" style={divStyle}>{course.total}</span></span>
      <span>{courseObj.name}</span>
    </div>
  )
}

export default Course
