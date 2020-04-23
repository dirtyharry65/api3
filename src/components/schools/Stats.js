import React, { useEffect , useState } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import CoursesContext from '../../context/courses/coursesContext';
import SchoolsContext from '../../context/schools/schoolsContext';
import { useContext } from 'react';


const Stats = props => {

const {viewedList, totalCount , totalStudentCount, userGroupTotal, studentGroupTotal, classRoom } = props;
const coursesContext = useContext(CoursesContext);
const schoolsContext = useContext(SchoolsContext);
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const  { courses ,getCourses } = coursesContext;
const { currentSchool } = schoolsContext;

const [ userTotal , setUserTotal] = useState(0);
const [ options , setOptions] = useState(null);


useEffect( () =>{
  if( courses === null ){
    getCourses();
  }
  // console.log(currentSchool );
  if(currentSchool.length > 0 ){
    let counter = 0;
    currentSchool.forEach( element => {
      counter+= element.total_users
    });
    setUserTotal(counter);
  }
  let dp = viewedList.map( (course , key) => { 
      const cf= findCourse( course.course_id)
      return { y: course.total ,label : cf.name };
  } )
    // console.log(dp);
  setOptions({
			animationEnabled: true,
			theme: "light2",
			axisX: {
				reversed: true,
			},
			data: [{
				type: "bar",
				dataPoints: dp
			}]
		})
    // eslint-disable-next-line
}, [viewedList])

const findCourse = ( id) => {
  if( courses) {
    const found = courses.find( needle => {
      return needle.id === parseInt(id)
    })
    return found;
  }
}


  return (
    <section className="timeline_panel">
      <h3>{ classRoom ? classRoom.group.name : "Groep" }</h3> 
      <h6>Aangemaakt op : { classRoom ? classRoom.group.datetime : null }</h6> 
      <h6>Totaal studenten: {studentGroupTotal} (+{ userGroupTotal - studentGroupTotal } docenten )</h6> 
      <h6>Totaal bekeken video's in groep: {totalCount}</h6>
      <h6>Totaal bekeken video's studenten: {totalStudentCount}</h6> 
      <h6>Gemiddeld aantal video's bekeken: {(userTotal/studentGroupTotal) ? (Math.floor((userTotal/studentGroupTotal)*100))/100 : null }</h6>
      {	<CanvasJSChart options = {options} /> }
    </section>
  )
}

export default Stats
