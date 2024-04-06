import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style/Navbar/vendorsidebar.css'


export const VendorSidebar = () => {
     const navigate=useNavigate();
     function handlesignout(){ 
         navigate('/logout')
       }
       
  return (
    <div className=' sidebar p-2'>
    <div className='m-2'>
      <i className='bi bi-bootstrap-fill me-3 fs-4'></i>
      <span className='brand-name fs-4'>EventEase</span>
      
    </div>

   
    <ul
    class="nav nav-pills flex-column"
  >
    <li class="nav-item py-2 py-sm-0">
      <Link to="/Vendor" class="nav-link text-white">
      <i className='fs-5 fa fa-house'></i><span className='fs-5 ms-3 d-none d-sm-inline'>Products</span>
        </Link>
    </li>
    <li class="nav-item py-2 py-sm-0">
    <Link to="#" class="nav-link text-white">
      <i className='fs-5 fa  fa-user '></i><span className='fs-5 ms-3 d-none d-sm-inline'>Profile</span>
        </Link>
    </li>
    <li class="nav-item py-2 py-sm-0 ">
    <Link to="/Vendor/customerorder" class="nav-link text-white">
      <i className='fs-5 fa fa-clipboard'></i><span className='fs-5 ms-3 d-none d-sm-inline'>Orders</span>
        </Link>
    </li>
    <li class="nav-item py-2 py-sm-0 ">
    <Link to="/Vendor/addproduct" class="nav-link text-white">
      <i className='fs-5 fa fa-table-list '></i><span className='fs-5 ms-3 d-none d-sm-inline'>Add Product</span>
        </Link>
    </li>
    <li class="nav-item py-2 py-sm-0 ">
    <Link to="#" class="nav-link text-white" onClick={handlesignout}>
      <i className='fs-5 fa fa-arrow-right-from-bracket'></i><span className='fs-5 ms-3 d-none d-sm-inline'>Signout</span>
        </Link>
    </li>
  </ul>
      
    </div>
  
      
  )
}