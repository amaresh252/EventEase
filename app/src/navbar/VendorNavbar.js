import React from 'react'
import '../style/Navbar/vendornavbar.css'
export const VendorNavbar = ({pagetitle}) => {
  return (
    <div className='container-fluid  position-fixed ' id='vendornav' >
        <nav className="navbar navbar-expand-sm navbar-dark  vendor-nav-inside">
    <div className='ms-4 mt-1 mb-1 fs-5'>{pagetitle}</div>
  </nav>
    </div>
    
  
  
  )
}
