import React, { useState , useContext , useEffect }  from 'react';
import {  Redirect } from "react-router-dom";
import SchoolsContext from '../../context/schools/schoolsContext';
import AuthContext from '../../context/auth/authContext';
import SchoolItem from './SchoolItem';
import SchoolDetail from './SchoolDetail';
import GroupDetail from './GroupDetail';
import './schools.css';
import Spinner from '../layout/spinner';


const Schools = (props) => {

  const schoolsContext = useContext(SchoolsContext);
  const authContext = useContext( AuthContext );
  const { isAuthenticated } = authContext;
  const { schools , getSchools, currentSchool, currentGroup, totalViews, loading, currentGroupID } = schoolsContext;

  const [filteredList, setFilteredList] = useState([]);



useEffect( ()=>{
  if( schools.length === 0 ){
    getSchools();
  } else {
    setFilteredList(schools);
  }
   // eslint-disable-next-line
},[ schools]);

  if( isAuthenticated) {
    return (
      <main className="schools-grid">
        <aside className="left-panel">
          <h3>Totaal bekeken video's: {totalViews}</h3>
          <header className="schools_grid-item">
            <strong>OPLEIDING</strong>
          </header>
          <ol className="schools_list">
            { filteredList.length > 0 ? filteredList.map((school, id) => { return <SchoolItem school={school} key={id} />}) : null  }
          </ol>
        </aside>
        <section className="group_structure"> 
  
          <SchoolDetail currentSchool={currentSchool} />
        </section>
        <section className="group_detail">
            
          <GroupDetail currentGroup={currentGroup} groupID={currentGroupID}/>
        </section>
         { loading ? <Spinner /> : null}
      </main>
    )
  } else {
    return <Redirect to='/' />
  }
}

export default Schools
