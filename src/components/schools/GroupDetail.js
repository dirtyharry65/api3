import React , {  useEffect , useState,useContext } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import SchoolsContext from '../../context/schools/schoolsContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import User from './User';
import Stats from './Stats';


export const GroupDetail = (props) => {

  const { currentGroup, groupID } = props;
  const schoolsContext = useContext(SchoolsContext);
  const { currentSchool } = schoolsContext;
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const [ totalCount , setTotalCount ] = useState(null);
  const [ totalStudentCount , setTotalStudentCount ] = useState(null);
  const [ userGroupTotal , setUserGroupTotal ] = useState(0);
  const [ studentGroupTotal , setStudentGroupTotal ] = useState(0);
  const [ classRoom , setClassRoom ] = useState(null);
  const [ startDate , setStartDate ] = useState( null);
  const [ endDate , setEndDate ] = useState( new Date());
  const [ options , setOptions ] = useState( null);
 
  const [ list , setList ] = useState([]);
  const [ isFiltered , setIsFiltered ] = useState(true);
  const [ filteredList , setFilteredList ] = useState([]);
  const [ totalViewedList , setTotalViewedList ] = useState([]);


  const generateReport = ( ) => {
    setTotalViewedList([])
    let counter = 0;
    let sCounter = 0;
    let sgCounter = 0;
    let coursesOverview = []
    currentGroup.forEach( user  => {
      if( user.roles === "student"){ 
        sgCounter++;
        sCounter += user.total }
        counter+= user.total;
      if( user.total > 0 && user.viewed ) { // user has views
        user.viewed.forEach( view => {
          const viewedCourses = coursesOverview.filter( course => { return course.course_id === view.course_id; } )         
          let total = 1;
          if(viewedCourses.length !== 0){ viewedCourses[0]['total']+=1 } else { coursesOverview.push({ 'course_id' : view.course_id, 'total' : total } ) }       
        });
      }
    });
    coursesOverview.sort( function (a, b) {
     return b.total - a.total;
    })
    setClassRoom( currentSchool.find( group => {
      return group.group.group_id === groupID 
      }))
    setTotalViewedList(coursesOverview);
    setUserGroupTotal(currentGroup.length);
    setStudentGroupTotal(sgCounter);
    setTotalCount(counter);
    setTotalStudentCount(sCounter);
  }
  const setStudentFiltered = e => {
    if(!isFiltered){
       setFilteredList( list.filter( item => { return item.roles === "student"}) )
    } else {
      setFilteredList(list);
    }
    setIsFiltered(!isFiltered);
  }

  useEffect(() => {
    generateReport( );
    setList( currentGroup.sort( function ( a, b ) { return b.total - a.total } ) );
    setFilteredList( currentGroup.filter( item => { return item.roles === "student" } ) );
    filterByDate(1 ,1 );
   // eslint-disable-next-line
  }, [currentGroup]);

  const filterByDate = ( start , end ) => {
    let filtList =  [];
    currentGroup.forEach( user => { 
      const group = groupBy( user.viewed , 'last_viewed') 
      Object.keys(group).forEach( ( date , index ) => {
        const da = new Date(date).toISOString().split('T')[0];
        filtList.push(da);
      })
    });
    if( filtList.length > 0 ){
      let counts={}
      filtList.forEach( x => {
        counts[x] = ( counts[x] || 0 ) +1
      })
      let dp = []
      Object.keys(counts).forEach( element => {
        const obj = {
          'x' : new Date(element),
          'y' : counts[element]
        }
        dp.push(obj);
       } );
        if(dp){
          if( start && start.constructor.name === "Date"){
            dp = dp.filter( pos =>{
              let a = new Date(pos.x);
              return ( a >= start && a <= end && end > start ) ? pos : null
            })
          }
          dp.sort((a, b) => { 
            a = new Date(a.x);
            b = new Date(b.x);
            return a>b ? -1 : a<b ? 1 : 0;
           }
          )
        }
        console.log(dp);
        setOptions( { data: [{ dataPoints: dp }] })
    }
   return null;
  }
  
  const groupBy = (OurArray, property) => {  
    return OurArray.reduce( (accumulator, object) => { 
      const key = object[property]; 
      !accumulator[key] ? (accumulator[key] = []) : (accumulator[key].push(object));
      return accumulator;
    }, {});
  }

  const selectedStartDate = date => {
    setStartDate(date);
    filterByDate( date , endDate );
  }
  const selectedEndDate = date => {
    setEndDate(date);
     filterByDate( startDate , date );
  }
  const resetDate = () =>{
    setStartDate(null);
    setEndDate(new Date());
      filterByDate( null , new Date()  );
  }
  console.log(options);
  return (
    <div>
      <Stats viewedList={totalViewedList} classRoom={classRoom} totalCount={totalCount} totalStudentCount={totalStudentCount} userGroupTotal={userGroupTotal} studentGroupTotal={studentGroupTotal} />
       <section className="timeline_panel">
        <h4>Kijkgeschiedenis:</h4>
        <DatePicker selected={startDate} onChange={selectedStartDate} /> <DatePicker selected={endDate} onChange={selectedEndDate} />
        <button className="btn" onClick={resetDate}>Reset Datum</button>
        { ( currentGroup.length > 0 && options )  ? 	<CanvasJSChart options = {options} /> : null }
      </section>
     <section className="timeline_panel groups_list">
       <h4>Groepsleden:</h4>
       <input type="checkbox" id="showStudents" onChange={setStudentFiltered} checked={isFiltered} />
        <label htmlFor="showStudents">Toon alleen Studenten</label>
        { filteredList.map( (user , key) => { return <User user={user} key={key} /> } ) }
     </section>
    </div>
  )
}
export default GroupDetail;