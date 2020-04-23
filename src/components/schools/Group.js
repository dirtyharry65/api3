import React, { useContext } from 'react';
import SchoolsContext from '../../context/schools/schoolsContext';

const Group = (props) => {

  const { name  } = props.group.group;

  const schoolsContext = useContext( SchoolsContext);

  const { getGroup ,currentGroupID } = schoolsContext;

  const getGroupItem = (e) => {
    getGroup(props.group.id)
  }

  return (
    <li  className={`group_grid-item${currentGroupID === props.group.id ? ' active' : '' }`} onClick={getGroupItem}>
      <span >{name}</span> <span>{props.group.total_users}</span><span>{props.group.courses.split(',').length}</span>
    </li>
  )
}

export default Group
