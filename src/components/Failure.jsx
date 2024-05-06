import React from 'react'
import { useParams } from 'react-router-dom';

function Failure() {
    const {payment_id} = useParams();

  return (
<div className='text-center'>
      {/* <FontAwesomeIcon icon={faSquareCheck}/> */}
      <span> <h1 style={{color:'red'}}>Payment Failed !!</h1></span>
      <span>order id:{payment_id}</span>
      
    </div>
  )
}

export default Failure