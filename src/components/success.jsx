import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useParams } from 'react-router-dom'

function success() {
  const {payment_id} = useParams();
  return (
    <div className='text-center'>
      {/* <FontAwesomeIcon icon={faSquareCheck}/> */}
      <span> <h1 style={{color:'green'}}>Payment Sucessfull !!</h1></span>
      <span>order id:{payment_id}</span>
    </div>
  )
}

export default success