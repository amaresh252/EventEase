import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  updateUserAsync,selectUserInfo, userInfoAsync } from "../auth/AuthSlice";
import { resetCartAsync, selectCartLoaded, selectItems } from "./CartSlice";
import {  useNavigate } from "react-router-dom";
import { createOrderAsync,createVendorSideOrderAsync,selectCurrentOrder } from "../order/OrderSlice";
import { CustomerNavbar } from "../navbar/CustomerNavbar";
import '../style/cart/checkout.css'
export default function Checkout() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);
  const  CurrentOrder=useSelector(selectCurrentOrder);
  const cartLoaded = useSelector(selectCartLoaded);
  const navigate = useNavigate();
  const [count,setCount]=useState(0);
  const [error,setError]=useState('');
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    Phone:"",
    Guest:"",
    Address1: "",
    Address2: "",
    City: "",
    State: "",
    PinCode: "",
  });
  const [currentAddress, setCurrentAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  var totalAmount=0;
  {items && items.length > 0 && items.map((item)=>(totalAmount+=item.product.itemPrice))}
  const productForVendor=items.map(item=>{
    return {
      itemImage: item.product.itemImage,
      itemName: item.product.itemName,
      itemPrice: item.product.itemPrice,
      vendor_id:item.product.userid,
      user_id: item.user,
      status:'pending',
      address:currentAddress,
    }
  })
  function handlechange(e) {
    const { id, value } = e.target;
    setAddress((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }
  useEffect(()=>{
    dispatch(userInfoAsync());
    setCount(0);
  },[dispatch,count])

  function handleSubmit(e) {
    e.preventDefault();
    if(user){
         dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, address] }));
    }
    setAddress({firstName: "",lastName: "",Phone:"",
    Guest:"",Address1: "",Address2: "",City: "",State: "",PinCode: ""});
    setCount(prev=>prev+1);
   
  }

  function handleAddress(e) {
    if (user) {
      setCurrentAddress(user.addresses[e.target.value]);
    }
  }

  function handlepayment(e) {
    setPaymentMethod(e.target.value);
  }

  function handleRemove(e,index){
    e.preventDefault();
    const  newuser={...user,addresses:[...user.addresses]}
    newuser.addresses.splice(index,1);
    dispatch(updateUserAsync(newuser));
    setCount(prev=>prev+1);

  }

  function handleOrder() {
    if (currentAddress && paymentMethod && items.length > 0) {
      const d=new Date()
      const  date=`${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
      dispatch(createVendorSideOrderAsync(productForVendor))
      dispatch(
        createOrderAsync({
          products: items,
          address: currentAddress,
          paymentMethod: paymentMethod,
          date: date,
          totalAmount:totalAmount,
        })
      )
      dispatch(resetCartAsync())
    } else {
      setError("select address and payment method and ensure items are in the cart");
    }
  }

  

  useEffect(()=>{
    {CurrentOrder && paymentMethod === "Cash" && navigate("../User/successorder")}
      {CurrentOrder && paymentMethod === "Card" && navigate("../User/successorder")}
     
  },[CurrentOrder])
 

  return (
    <>
      <CustomerNavbar/>
      
      <div className="row container-fluid checkout">
      <div className="col-md-8 ">
      <div className="container py-5 mb-3" id="checkoutform" >
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
  <div className="row">
    <div className="form-group col-md-6">
      <label htmlFor="firstName">First Name</label>
      <input id="firstName" className="form-control" type="text" value={address.firstName} onChange={handlechange} required />
      <div className="invalid-feedback">
        Please provide a valid first name.
      </div>
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="lastName">Last Name</label>
      <input id="lastName" className="form-control" type="text" value={address.lastName} onChange={handlechange} required />
      <div className="invalid-feedback">
        Please provide a valid last name.
      </div>
    </div>
  </div>
  <div className="row">
    <div className="form-group col-md-8">
      <label htmlFor="Phone">Phone</label>
      <input id="Phone" className="form-control" type="text" value={address.Phone} onChange={handlechange} required />
      <div className="invalid-feedback">
        Please provide a valid phone.
      </div>
    </div>
    <div className="form-group col-md-4">
      <label htmlFor="Guest">Number of Guest</label>
      <input id="Guest" className="form-control" type="text" value={address.Guest} onChange={handlechange} required />
      <div className="invalid-feedback">
        Please provide number og guest.
      </div>
    </div>
    </div>
  <div className="form-group">
    <label htmlFor="Address1">Address1</label>
    <input id="Address1" className="form-control" type="text" value={address.Address1} onChange={handlechange} required />
    <div className="invalid-feedback">
      Please provide a valid address.
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="Address2">Address2</label>
    <input id="Address2" className="form-control" type="text" value={address.Address2} onChange={handlechange} />
  </div>
  <div className="row">
    <div className="form-group col-md-6">
      <label htmlFor="City">City</label>
      <input id="City" className="form-control" type="text" value={address.City} onChange={handlechange} required />
      <div className="invalid-feedback">
        Please provide a valid city.
      </div>
    </div>
    <div className="form-group col-md-4">
      <label htmlFor="State">State</label>
      <input id="State" className="form-control" type="text" value={address.State} onChange={handlechange} required />
      <div className="invalid-feedback">
        Please provide a valid state.
      </div>
    </div>
    <div className="form-group col-md-2">
      <label htmlFor="PinCode">Pincode</label>
      <input id="PinCode" className="form-control" type="text" value={address.PinCode} onChange={handlechange} required />
      <div className="invalid-feedback">
        Please provide a valid pincode.
      </div>
    </div>
  </div>
  <button className="btn btn-primary mt-2" type="submit">Save</button>
</form>

      </div>
      
    <div className="container " id="checkout-address">
    <div>Select Address</div>
     <ul className="no-bullets">
      {user && user.addresses.map((address, index) => (
      <li  key={index} id="checkout-address-part">
      
      <div className="row">
      
        <div ><input id={`address-${index}`} name="address" type="radio" value={index} onChange={handleAddress} />  <b className="ms-1">{address.firstName} {address.lastName}</b></div>
        </div>
        <div className="row mt-2 ms-2">
        <div className="col" > {address.Address1} </div>
        <div className="col"> {address.Address2}</div>
        <div className="col">{address.City}</div>
        </div>
        <div className="row mt-2 ms-2">
        <div className="col" >{address.State} , {address.PinCode}</div>
        <div className="col" >Phone: {address.Phone}</div>
        <div className="col" >No. of Guest: {address.Guest}</div>
        <div className="col-md-2 mb-2 mt-1"><button className="btn btn-primary" onClick={(e)=>handleRemove(e,index)}>Remove</button></div>
        </div>
        </li>
        ))}
       </ul>
         </div>
     <div className="container mt-2 py-5 mb-3" id="checkout-payment">
      
        <div >Select Payment Method</div>
        <div className="row ">
        <div className="col-md-12 mb-1 mt-1">
        <input id="Cash" name="paymentmethod" type="radio" value="Cash" checked={paymentMethod === "Cash"} onChange={handlepayment} />
        <label className="ms-2" htmlFor="Cash">Cash</label>
        </div>
        <div className="col-md-12 mt-1 mb-1">
        <input id="Card" name="paymentmethod" type="radio" value="Card" checked={paymentMethod === "Card"} onChange={handlepayment} />
        <label className="ms-2" htmlFor="Card">Card</label>
        </div>
        </div>
      
      </div>
      </div>
        <div className="col-md-4">
          <div className="container py-5 " >
          <ul class="list-group mb-3 ">
       
          {items && items.length>0 && items.map((item)=>(
             <li class="list-group-item d-flex justify-content-between lh-condensed"  id="checkout-data">
              <div>
            <h6 class="my-0">{item.product.itemName}</h6>
            <small class="text-muted">{item.product.itemType}</small>
          </div>
          <span class="text-muted"><i class="fa-solid fa-indian-rupee-sign"></i> {item.product.itemPrice}</span>
        </li>
          ))}
        <li class="list-group-item d-flex justify-content-between" id="checkout-total">
          <span>Total (INR)</span>
          <strong><i class="fa-solid fa-indian-rupee-sign"></i> {totalAmount}</strong>
        </li>
      </ul>
      <div className="row px-5">
      <button className="btn btn-success" type="button" onClick={handleOrder}>
        Place Order
      </button>
      {error && <p className="text-danger">{error}</p>}
      </div>
      
          </div>
   
        </div>
      </div>
     

      
    </>
  );
}
