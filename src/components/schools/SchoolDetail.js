import React, { useEffect , useState, Fragment} from 'react';
// import SchoolContext from '../../context/schools/schoolsContext';
import Group from './Group';


const SchoolDetail = props => {

// const schoolContext = useContext(SchoolContext);
const { currentSchool } = props;
const [ userTotal , setUserTotal] = useState(0);

useEffect( () => {
   let counter = 0;
    currentSchool.forEach( element => {
      counter+= element.total_users
    });
    setUserTotal(counter);
}, [currentSchool])

console.log(currentSchool);
  return (
     <Fragment>
       <h3>School</h3>
       <h5>{userTotal} inschrijvingen</h5>
       <section className="student_grid-item">
        <strong >Naam</strong>
        <strong>Leerlingen</strong>
        <strong >Cursussen</strong>
      </section>
      <ol className="groups_list">
        { currentSchool ? currentSchool.map( (group , key) => {
          //  console.log(group);
            return <Group group={group} key={key}/>
          }) : null }
      </ol>
    </Fragment>
  )
}

export default SchoolDetail
