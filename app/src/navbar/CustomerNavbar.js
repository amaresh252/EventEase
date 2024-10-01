import React, { useEffect } from 'react'
import  '../style/Navbar/CustomerNavbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { selectItems,fetchItemsByUserIdAsync } from '../cart/CartSlice'


export const CustomerNavbar = () => {
    
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const items = useSelector(selectItems);
    console.log(items.length)
     const cart_product=items.length;
    
    
    function handlesignout(){
        
        navigate('/logout') 
       }
       useEffect(() => {
     
        dispatch(fetchItemsByUserIdAsync());
      }, [dispatch]);
  return (
    <nav className="navbar navbar-dark navbar-expand-lg  " id='customer-nav' >
  <div className="container " >
    <div className="navbar-brand   " id='customer-nav-brand' ><img src="/eve-logo.png" height={45} width={40}/>EventEase</div>
    <button className="navbar-toggler border-0 " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="sidebar offcanvas offcanvas-start text-bg-success" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title customer-nav-title" id="offcanvasDarkNavbarLabel">Profile</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body" id='customer-nav-title'>
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <Link className="nav-link active " aria-current="page" to="/Customer">Home</Link>
          </li>
          <li className="nav-item">
            <div className='customer_cart_icon'>
           {cart_product!=0 && <div className='customer_cart_number'>{cart_product}</div>}
            <Link className="nav-link active " to="/User/cart">Cart</Link>
            </div>
          </li>
          <li className="nav-item  dropdown">
            <a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Profile
            </a>
            <ul className="dropdown-menu dropdown-menu-dark" >
              <li><Link className="dropdown-item " to="/User/profile">UserProfile</Link></li>
              <li><Link className="dropdown-item " to="/User/order">Orders</Link></li>
              <li className="dropdown-item " onClick={handlesignout}>Signout</li>
            </ul>
          </li>
        </ul>
       
      </div>
    </div>
  </div>
</nav>
  )
}
