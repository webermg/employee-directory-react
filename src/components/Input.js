import React from 'react'

export default function Input(props) {
  return (
    <div className="row justify-content-center">
      <div className="form-group col-2">
        <input value={props.value} name={props.name} type={props.type} className="form-control" id="input1" onChange={props.onChange} placeholder={props.title} />
      </div>
    </div>
  )
}
