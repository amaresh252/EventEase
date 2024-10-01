import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteVendorSideOrderAsync, fetchVendorSideOrderAsync, selectVendorSideOrder } from '../../order/OrderSlice'
import { Link } from 'react-router-dom';
import { VendorSidebar } from '../../navbar/VendorSidebar';
import { VendorNavbar } from '../../navbar/VendorNavbar';
import '../../style/vendor/product.css'
import { selectProductStatus } from '../AddProductSlice';
import { Buffer } from '../../page/Buffer';
import VendorSideFooter from '../../footer/VendorSideFooter';

export const VenderSideCustomerOrder = () => {
  const order=useSelector(selectVendorSideOrder);
      const  dispatch=useDispatch();       
    const status=useSelector(selectProductStatus);
    const pagetitle='Orders';
    useEffect(()=>{
        dispatch(fetchVendorSideOrderAsync())
    },[dispatch])

   function handleDelete(e,_id){
    dispatch(deleteVendorSideOrderAsync(_id));
   }
  return (
     <div className='container-fluid min-vh-100' id='vendor-background'>
     <div className='row'>
      
         <div className='col-4 col-md-2  vh-100  position-fixed' id="sidebar-wrapper">
           <VendorSidebar/>
         </div>
       
        <div className='col-4 bg-info col-md-2'></div>
       <div className='col' style={{'padding':'0' }}>
       <VendorNavbar pagetitle={pagetitle} />
       <div className='px-3'>
       {status!='loading' ?
     <div className='container-fluid'>
       <div className='row g-3 pt-5 my-2'>
       <div className="col-md-12  ">
       <table class="table caption-top table-hover table-striped ">
      <caption className='text-white fs-4'>Recent Orders</caption>
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Name</th>
      <th scope="col">Guest</th>
      <th scope="col">Status</th>
      <th scope="col">Address</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
       {
        order && order.length>0 ?
        (order.map((item)=>(
              <tbody  key={item._id}>
                <tr>
                  <td><img src={item.itemImage} alt="image" width={80} height={80}/></td>
                  <td>{item.itemName}</td>
                  {item.address.Guest && <td><small>{item.address.Guest}</small></td>}
                  <td><Link className='text-success text-decoration-none' to={`/Vendor/statusupdate/${item._id}`}><p>{item.status}</p></Link></td>
                  {item.address.firstName && <td>{item.address.firstName} {item.address.lastName} {item.address.Phone} {item.address.Address1}, {item.address.City}</td>}
                  <td><button className='btn btn-secondary' onClick={(e)=>handleDelete(e,item._id)}>Delete</button> </td>
                  </tr>            
                  </tbody>
            
           
        ))):<p>Currently There Is No Orders Available</p>
    }
     </table>
     </div>
       </div>
     </div>:<div className='mt-4 pt-4'><Buffer/></div>}
   </div>
   <VendorSideFooter/>
       </div>
     </div>
   </div>
  )
}
