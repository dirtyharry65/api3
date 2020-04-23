import React, { useState , useEffect, useContext } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import CoursesContext from '../../context/courses/coursesContext';

const User = props => {
  const { user } = props;
  // const colors = ['#5E88BF', '#6997BF','#F2F2F2','#8FD1D9','#94F2F2'];

const coursesContext = useContext(CoursesContext);
const  { courses  } = coursesContext;
  const [ options , setOptions] = useState(null);
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const groupBy = (OurArray, property) => {  
    return OurArray.reduce( (accumulator, object) => { 
      const key = object[property]; 
      !accumulator[key] ? (accumulator[key] = []) : (accumulator[key].push(object));
      return accumulator;
    }, {});
  }

  const findCourse = ( id) => {
  if( courses) {
    const found = courses.find( needle => {
      return needle.id === parseInt(id)
    })
    return found;
  }
}

  useEffect( () => {
    let dp = [];
    if(user){
      const viewed = groupBy(user.viewed , 'course_id');
      
      Object.keys( viewed).forEach( (view, index ) =>{
        const cf= findCourse( view );
        if( viewed[view].length > 0 && viewed[view]!== null ){
          dp.push( { x:index, label: cf.name,   y: viewed[view].length });
        }
        // return
      })
    }
    setOptions(
      {
        // width:800,
			data: [
        {
          type : "doughnut",
          dataPoints : dp
        }
      ]
		})
    // eslint-disable-next-line
  },[ user])

  

  return (
    <article className="student_item">
      <header>
        <span className="user user_role">{user.roles}</span><span className="user user_id">#{ user.ID}</span><span className="user user_viewed"> Bekeken: {user.total}</span>
      </header>
      <section>
        {
          (user.total > 0 )? <CanvasJSChart options={options} /> : null
        }
      </section>
    </article>
  )
}
export default User;
