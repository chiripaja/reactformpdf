import React from 'react'

function Alerterror(props) {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">

    <p>{props.errortxt}</p>
  </div>
 
  )
}

export default Alerterror