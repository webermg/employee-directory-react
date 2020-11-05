import React from 'react'

export default function Tablerow(props) {
  const formatDate = function(date) {
    const temp = date.split(/T/)[0];
    const temp2 = temp.split(/-/);
    return `${temp2[1]}/${temp2[2]}/${temp2[0]}`
  };

  return (
    <tr>
      <th scope="row"><img alt="" src={props.pic}/></th>
      <td>{props.first + " " + props.last}</td>
      <td>{props.phone}</td>
      <td>{props.email}</td>
      <td>{formatDate(props.dob)}</td>
    </tr>
  )
}
