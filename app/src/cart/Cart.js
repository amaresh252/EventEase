import { useDispatch, useSelector } from "react-redux";
import { removeFromCartAsync, selectItems ,selectCartLoaded,fetchItemsByUserIdAsync} from "./CartSlice";
import { useEffect } from "react";
import { Link ,Navigate} from "react-router-dom";
import { CustomerNavbar } from "../navbar/CustomerNavbar";
import '../style/cart/cart.css'
export default function Cart() {
  const dispatch = useDispatch();

const items = useSelector(selectItems);
  const cartLoaded = useSelector(selectCartLoaded)
  var totalAmount=0;
 {items && items.length > 0 && items.map((item)=>(totalAmount+=item.product.itemPrice))}
  useEffect(() => {
     
    dispatch(fetchItemsByUserIdAsync());
  }, [dispatch]);

  function handleremove(e, _id) {
    dispatch(removeFromCartAsync(_id));
  }

  return (
    <div id="cart-head">
    <CustomerNavbar/>
     {!items.length && cartLoaded  && <Navigate to="/Customer" replace={true}></Navigate>}
      {console.log(items)}

      <div className="container py-5 pb-3" >
      <div className="card  mx-auto" id="cart">
  
  {items && items.length > 0 ? (
        items.map((item) => (
 <div id="cart-card" className="row g-0 " key={item._id}>
   <div className="col" >
            <img src={item.product.itemImage} alt="image" id="img-cart" className="img-fluid rounded-start"/>
   </div>
   <div className="col">
      <div className="card-body">
        <h5 className="card-title">{item.product.itemName}</h5>
        <p >{item.product.itemType}</p>
        </div>
    </div>
    <div className="col  ">
      <div id="cart-third-part">
      <p >Price: <small className="text-muted"><i class="fa-solid fa-indian-rupee-sign"></i> {item.product.itemPrice}</small></p>
      <button className="btn btn-danger" onClick={e => handleremove(e, item._id)}>Remove</button>
      </div>
      </div>
      <hr/>
</div>
        ))
      ) : (
        <p>No Cart Item</p>
      )}
      <div className="row g-0">
        <div id="cart-total-amount" className="col">
          <p>Total Amount</p>
        </div>
        <div id="cart-total-money" className="col">
          <p><small className="text-muted"><i class="fa-solid fa-indian-rupee-sign"></i> {totalAmount}</small></p>
        </div>
      </div>
      <div className="row g-0 mx-auto mb-3">
        
      <Link to="/User/checkout">
        <button className="btn btn-success">Go to Checkout</button>
      </Link>
      </div>
      
     </div>
</div>
    </div>
  );
}
