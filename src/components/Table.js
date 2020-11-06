import { render } from '@testing-library/react'
import React from 'react'
import Tablerow from './Tablerow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'


export default function Table(props) {
  const getCaret = (prop) => {
    if(prop === 1) return <FontAwesomeIcon icon={faCaretDown} />;
    if(prop === -1) return <FontAwesomeIcon icon={faCaretUp} />;
    else return "";
  }

  return (

    <table className="table table-striped">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Image</th>
          <th scope="col" onClick={() => {props.onClick("name")}}>Name{getCaret(props.status.name)}</th>
          <th scope="col" onClick={() => props.onClick("phone")}>Phone{getCaret(props.status.phone)}</th>
          <th scope="col" onClick={() => props.onClick("email")}>Email{getCaret(props.status.email)}</th>
          <th scope="col" onClick={() => props.onClick("dob")}>DOB{getCaret(props.status.dob)}</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map(item => <Tablerow image={item.image} name={item.name} phone={item.phone} email={item.email} dob={item.dob} />)}
      </tbody>
    </table>
  )
}
