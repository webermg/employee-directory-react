import React from 'react'

export default function Tablerow(props) {

  return (
    <tr>
      <th scope="row"><img alt="" src={props.image}/></th>
      <td>{props.name}</td>
      <td>{props.phone}</td>
      <td>{props.email}</td>
      <td>{props.dob}</td>
    </tr>
  )
}
