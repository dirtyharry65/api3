import { SET_LOADING, GET_SCHOOLS, GET_SCHOOL ,GET_SCHOOL_ID, GET_GROUP, GET_GROUP_ID } from '../types';

const SchoolsReducer = (state, action) => {
   switch (action.type) {
    case GET_SCHOOLS:
      return {
      ...state,
      schools: action.payload.data,
      totalViews : parseInt(action.payload.viewed),
      loading : false
      }
    case GET_SCHOOL:
      return {
      ...state,
      currentSchool: action.payload.data,
      currentGroup : [],
      loading : false
      }
      case GET_GROUP :
        return {
          ...state,
          currentGroup : action.payload,
          loading : false
        }
    case GET_SCHOOL_ID:
      return {
      ...state,
      currentSchoolID: action.payload,
      loading : false
      }
    case GET_GROUP_ID:
      return {
      ...state,
      currentGroupID: action.payload,
      loading : false
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    
    default:
      return state;
   }
}

export default SchoolsReducer;