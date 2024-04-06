import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { resetCartAsync } from '../cart/CartSlice'
import '../style/Success-order/success-order.css'
import { useDispatch } from 'react-redux'
export const SucessOrder = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(resetCartAsync())
  },[dispatch])
  return (
    <div className='d-flex vh-100 success-order text-center '>
    <div className=' align-content-center justify-content-center '>
      <h1 className='success-order-title py-5 px-5'>Success Order</h1>
      <Link to='/User/profile'><button className='btn btn-lg btn-success'>Go To Profile</button></Link>
  </div>
  </div>
  )
}
