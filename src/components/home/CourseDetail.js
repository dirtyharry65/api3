import React , { useEffect, useState, useContext, Fragment  } from 'react';
import CoursesContext from '../../context/courses/coursesContext';
import Chapter from './Chapter';


const CourseDetail = props => {
 
  const { currentCourse ,currentCourseID } = props;
  const [ chapterList , setChapterList] = useState([]);
  const coursesContext = useContext(CoursesContext);
  const { setCourse } = coursesContext;

  let header = null; 
  useEffect( ()=>{
    if(currentCourse && currentCourse.chapters) {
      const chapters = currentCourse.chapters
      setChapterList(Object.keys(chapters).map( (chapter  ) => { return chapters[chapter] }));
    }
     
  },[currentCourse]);


const saveCourse = () => {
  setCourse(  currentCourseID ,currentCourse, currentCourse.count);
}
  return (
    <div className="course-content">
      <div className="course-content-top">
        { currentCourseID ? <button className="btn" onClick={saveCourse}>Update cursus op API2</button> : <p>Selecteer links uit de lijst</p> }
      </div>
      <header className="course-header">
        <h2>{currentCourse.name} {currentCourseID !== null ? `(${currentCourseID})`: null }</h2>
        <section className="meta-data">
          <span className="meta-cell">{ currentCourseID !== null ? <Fragment><span className="meta-key">Interne ID:</span><span className="meta-value"> {currentCourse.acf.intern_nummer}</span></Fragment>: null }</span>
          <span className="meta-cell">{ currentCourseID !== null ? <Fragment><span className="meta-key">Aantal video's: {currentCourse.acf.aantal_videos}</span></Fragment>: null }</span>
          <span className="meta-cell">{ currentCourseID !== null ? <Fragment><span className="meta-key">Tijdsduur: {currentCourse.acf.totale_tijdsduur}</span></Fragment>: null }</span>
          <span className="meta-cell">{ currentCourseID !== null ? <Fragment><span className="meta-key">Status: {currentCourse.acf.actief ? 'actief' : 'niet actief'}</span></Fragment>: null }</span>
          <span className="meta-cell">{ currentCourseID !== null ? <Fragment><span className="meta-key">Gepubliceerd op: {currentCourse.acf.datum}</span></Fragment>: null }</span>
          <span className="meta-cell">{ currentCourseID !== null ? <Fragment><span className="meta-key">Niveau: {currentCourse.acf.niveau}</span></Fragment> : null }</span>
        </section>
        <aside className="description">{currentCourse.description}</aside>
      </header>
      <section className="chapter-list">
        { chapterList.map( (chapter , key) => {
          return <Chapter current={chapter} key={key} id={key+1}/>
        }) }
      </section>
    </div>
  )

  
}

export default CourseDetail
