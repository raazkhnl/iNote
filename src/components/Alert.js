import React from 'react'

const Alert = (props) => {
 
  return (
    <div style={{height: "50px"}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show pt-2 sticky-top`} role="alert" style={{height: '40px'}}>
        <h6>{props.alert.msg}</h6>
        </div>}
      
    </div>
  )
}

export default Alert