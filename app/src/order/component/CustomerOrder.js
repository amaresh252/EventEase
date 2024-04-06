
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrderAsync, selectUserOrder } from "../OrderSlice";
import { useEffect } from "react";
import { CustomerNavbar } from "../../navbar/CustomerNavbar";
import '../../style/order/customerorder.css'

export default function CustomerOrder(){
    const orders=useSelector(selectUserOrder);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchUserOrderAsync())
    },[dispatch])
    return(
        <div >
        <CustomerNavbar/>
{
  orders && orders.length > 0  && (
    orders.map((order) => (
       
         <div  key={order._id} className="container px-5 py-2" id="user-order">
           <div className="row g-0 mt-5 mb-3">
           <h2>Order Id: {order._id}</h2>
          </div>
          <div className="row g-0 mb-3">
           <h5>Date: {order.date}</h5>
          </div>
         {order.products && order.products.length > 0 && (
          
           order.products.map((item) => (
           
        
         <div key={item.product._id} className="row g-0">
          <div className="col-md-2">
          <img src={item.product.itemImage} className="img-fluid" id="order-img"/>
          </div>
            <div className="col-md-2" id="order-item"> {item.product.itemName} </div>
            <div className="col-md-8" id="order-price"><i class="fa-solid fa-indian-rupee-sign"></i> {item.product.itemPrice}</div>
         </div>
         
         ))
        )}
         <hr/>
         <div className="row g-0 mb-4">
          <div id="order-total-price">
            <div>Total</div>
            <div><i class="fa-solid fa-indian-rupee-sign"></i> {order.totalAmount}</div>
          </div>
         </div>
         <p>Shipping Address</p>
         <div className="row g-0 border mb-4">
          <div className="col ">
            <div className="ms-3 mt-3">
            <p>
            {order.address.Address1}
            </p>
            <p>
            {order.address.Address2}
            </p>
            <p>
            {order.address.City}
            </p>
            </div>
           
          </div>
          <div className="col" id="order-address-part2">
            <div className="me-3 mt-3">
            <p>
            {order.address.State}
            </p>
            <p>
            {order.address.PinCode}
            </p>
            <p>
            Phone: {order.address.Phone}
            </p>
            <p>
            Guest: {order.address.Guest}
            </p>
            </div>
           
          </div>
         </div>
         </div>
           
           ))
         )
       }
      
       
        </div>
    )
}