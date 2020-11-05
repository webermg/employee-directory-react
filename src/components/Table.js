import React from 'react'
import Tablerow from './Tablerow'

export default function Table(props) {
  return (

    <table className="table table-striped">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Phone</th>
          <th scope="col">Email</th>
          <th scope="col">DOB</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map(item => <Tablerow pic={item.picture.thumbnail} first={item.name.first} last={item.name.last} phone={item.phone} email={item.email} dob={item.dob.date} />)}
      </tbody>
    </table>

  )
}
