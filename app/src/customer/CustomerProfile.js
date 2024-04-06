import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo ,userInfoAsync} from '../auth/AuthSlice'
import { selectCustomerCurrentOrder,fetchCustomerCurrentOrderAsync } from '../order/OrderSlice';
import { CustomerNavbar } from '../navbar/CustomerNavbar';
import '../style/customer/customerprofile.css'

export const CustomerProfile = () => {
    const dispatch=useDispatch();
    const user=useSelector(selectUserInfo);
    const currentorder=useSelector(selectCustomerCurrentOrder);
    useEffect(()=>{
        dispatch(userInfoAsync())
        dispatch(fetchCustomerCurrentOrderAsync())
    },[dispatch])
    
  return (
    <div id='cutomer-profile'>
      <CustomerNavbar/>
      <div className='container-fluid pe-3' >
        <div className='row' >
        <div className='col-md-3' >
          <div className='row g-0 my-2'id='customer-current-items'>
            <div className='ms-3'><h5><img src='/profile-user.png' height={40} width={40} /> New User</h5></div>
            <div className='ms-3'>Email Id : { user && user.username}</div>
            
          </div>
        
        </div>
        <div className='col-md-9' id='current-item-container'>
        <div className='row g-0  my-2'><h2>Current Orders</h2></div>
        {currentorder && currentorder.map((item)=>(
        <div className='row g-0  my-2 ' key={item._id} id='customer-current-items' >
            <div className='col ' >
            <img src={item.itemImage} id='current-item-image'  className='img-fluid ' alt="image"  />
            </div>
            <div className='col'>
              <div id='current-item-heading'>
              <p><b>{item.itemName}</b></p>
              <p><small><i class="fa-solid fa-indian-rupee-sign"></i> {item.itemPrice}</small></p>
              </div>
            </div>
            <div className='col'>
              <div id='current-item-status' className='text-success' >
              <p>{item.status}</p>
              </div>
            </div>
            <div className='col'>
              <div id='current-item-address' >
              <i>{item.address.Address1}, {item.address.City}</i>
              <i>{item.address.State}, {item.address.PinCode}</i>
              </div>
            </div>
            <div className='col'>
            <div id='current-item-address'>
              <i>Phone: {item.address.Phone}</i>
              <i>Guest: {item.address.Guest}</i>
              </div>
            </div>

          </div>
        ))}
          
        </div>
        
        </div>
        </div>
    </div>
  )
}
