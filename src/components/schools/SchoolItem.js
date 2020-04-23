import React, { useContext } from 'react';
import SchoolContext from '../../context/schools/schoolsContext';



const SchoolItem = (props) => {

  const { school }  = props;
  const schoolContext = useContext( SchoolContext);
  const { getSchool , currentSchoolID } = schoolContext;

  const setSchool = (e) => {
    getSchool(school.blog_id);
  }
 if( parseInt(school.blog_id) !== 1 ){
  //  console.log(currentSchoolID , school.blog_id);
   return (
      <li className={`schools_grid-item${currentSchoolID === school.blog_id ? ' active' : '' }`} id={school.blog_id}><h4> { school.blogname}</h4><button className="btn" onClick={ setSchool } >Overzicht</button></li>
   )
 } else {
   return null;
 }
 
}

export default SchoolItem
