import React, { useEffect } from 'react'
import {  selectLoggedInUser, signoutAsync } from '../AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
export const Logout = () => {

   const dispatch=useDispatch();
   const navigate=useNavigate();
   const user=useSelector(selectLoggedInUser);
   

   useEffect(()=>{
    dispatch(signoutAsync()); 
   })

  return (
    <div>
        {!user && navigate('/login')}
    </div> 
  )
}
