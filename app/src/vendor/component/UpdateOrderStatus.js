import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSingleVendorSideOrderAsync, updateVendorSideOrderAsync,selectSingleVendorSideOrder } from '../../order/OrderSlice';
import { VendorSidebar } from '../../navbar/VendorSidebar';
import { VendorNavbar } from '../../navbar/VendorNavbar';
import '../../style/vendor/product.css'
import VendorSideFooter from '../../footer/VendorSideFooter';

export const UpdateOrderStatus = () => {
    const dispatch=useDispatch();
    const {_id}=useParams();
    const navigate=useNavigate();
    const product=useSelector(selectSingleVendorSideOrder)
    const [status,setStatus]=useState(product?product.status:'pending')
    const pagetitle='Update Order Status';
    useEffect(()=>{
        dispatch(fetchSingleVendorSideOrderAsync(_id))
    },[dispatch,_id])

    function handleStatus(e){
        setStatus(e.target.value)
    }
    
    function handleUpdate(e){
        e.preventDefault();
        dispatch(updateVendorSideOrderAsync({...product,status:status}))
        navigate('/Vendor/customerorder')
    }
    
  return (
    <div className='container-fluid min-vh-100' id='vendor-background'>
    <div className='row'>
      
        <div className='col-4 col-md-2  vh-100  position-fixed' id="sidebar-wrapper">
          <VendorSidebar/>
        </div>
      <div className='col-4  col-md-2'></div>
      <div className='col' style={{'padding':'0' }}>
      <VendorNavbar pagetitle={pagetitle} />
      <div className='px-3'>
   
    <div className='container-fluid'>
      <div className='row my-5 g-3 pt-5'>
    <div className='container'>
    <div className='row justify-content-center'>
    <div className='col-md-6 card' id='vendor-updateproduct'>
        <form enctype="multipart/form-data" onSubmit={handleUpdate}>
            <div className='row m-4 justify-content-center'>
            <div className='col-md-8 '>
            <h3>Update Order Status</h3>
            </div>
        </div>
        <div className='row m-4 justify-content-center '>
            <div className=' col-md-1'>
            <input id='Recieved' type='radio' name='status' value='recieved' onClick={handleStatus}/>
            
            </div>
            <div className='col-md-4'>
            <label htmlFor="Recieved">Recieved</label>
            </div>
        </div>
        <div className='row m-4 justify-content-center'>
            <div className=' col-md-1'>
            <input id='Booked' type='radio' name='status' value='booked' onClick={handleStatus}/>
            </div>
            <div className='col-md-4'>
            <label htmlFor='Booked' >Booked</label>
            </div>
        </div>
        <div className='row m-4 justify-content-center'>
            <div className=' col-md-1'> 
            <input id='Ready for Shipping' type='radio' name='status' value='ready for shipping' onClick={handleStatus}/>
            </div>
            <div className='col-md-4'>
            <label htmlFor="Ready for Shipping"> Ready for Shipping</label>
            </div>
        </div>
        <div className='row m-4 justify-content-center'>
            <div className=' col-md-1'>
            <input id='Out for Delivery' type='radio' name='status' value='out for delivery' onClick={handleStatus}/>
            </div>
            <div className='col-md-4'>
            <label htmlFor='Out for Delivery'>Out for Delivery </label>
            </div>
        </div>
        <div className='row m-4 justify-content-center'>
            <div className=' col-md-1'>
            <input id='Deliverd' type='radio' name='status' value='deliverd' onClick={handleStatus}/>
            </div>
            <div className='col-md-4'>
            <label htmlFor='Deliverd' >Deliverd</label>
            </div>
        </div>
        
        <div className='row m-4 justify-content-center '>
            
            <div className='col-md-4'>
            <button type="submit" className='btn btn-success w-100'>Update</button>
            </div>
        </div>
      </form>
                </div>
            
            </div>
        </div>
    
    </div>
    </div>
  </div>
  <VendorSideFooter/>
      </div>
    </div>
  </div>
  )
}
