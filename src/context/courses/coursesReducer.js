import { GET_COURSES, SET_COURSE, SET_LOADING, UPDATE_COURSE } from '../types';

const CoursesReducer = (state, action) => {
   switch (action.type) {
    case GET_COURSES:
      return {
      ...state,
      courses: action.payload,
      loading : false
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
     case SET_COURSE:
      return {
        ...state,
        loading: false,
        currentCourse: action.payload.course,
        currentCourseID : action.payload.courseId,
      }
      case UPDATE_COURSE:
        return {
          ...state,
          loading : false,
        }
    default:
      return state;
   }
}

export default CoursesReducer;