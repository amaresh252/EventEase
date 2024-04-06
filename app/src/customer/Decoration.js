import { useEffect } from "react";
import { fetchAllProductForHomeAsync, selectAllProduct } from "../vendor/AddProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../auth/AuthSlice";
import NotFoundPath from "../NotFoundPath";
import { addToCartAsync } from "../cart/CartSlice";
import { Link } from "react-router-dom";
import { CustomerNavbar } from "../navbar/CustomerNavbar";
import'../style/customer/home.css'

export default function Decoration() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProduct);
  const user = useSelector(selectLoggedInUser);
  const productsByCategory = products.filter(product => product.itemType === 'decoration')
  useEffect(() => {
    if(user){
      dispatch(fetchAllProductForHomeAsync())
    }  
  }, [dispatch]);
  function handleAddToCart(e, _id) {
    dispatch(addToCartAsync({ product: _id }))
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  }
  return (
    <div className="container-fluid home-whole">
      <div className="row">
      <CustomerNavbar />
      </div>
      <div className="row pt-4 text-center justify-content-center category-heading">
      <div className="col-md-8">
      <h1>Transform Spaces by Creative Decoration Ideas for Your Event</h1>
        </div>
      
      </div>
      <div className="row px-5 py-5">
        <div className="row justify-content-center">
        
        <div className="col-md-3 text-center bg-warning py-2 "><Link to='/User/venue' className="text-decoration-none text-dark">Venue</Link></div>
        <div className="col-md-1"></div>
        <div className="col-md-3 text-center bg-success py-2 "><Link to='/User/catering' className="text-decoration-none text-dark">Catering</Link></div>
        <div className="col-md-1"></div>
        <div className="col-md-3 text-center bg-primary py-2 "><Link to='/User/decoration' className="text-decoration-none text-dark">Decoration</Link></div>
        </div>
        <div className="row pt-4 justify-content-center">
        <div className="col-md-4 text-center bg-danger py-2"><Link to='/User/music' className="text-decoration-none text-dark">Music</Link></div>
        </div>
      </div>
      <div className="row py-5">
      {products && products.length > 0 ? (
                      <div >
                        <div className="container py-1 mb-3">
                        <div className="row row-cols-1 row-cols-md-4 g-4">
                          {productsByCategory.map((product) => (
                            <div className="col " key={product._id}>
                              <div id="card1" className="card  h-100 ">
                                <img src={product.itemImage} className="card-img-top" id="cardimgtop1" alt="image"  />
                                <div className="card-body row text-center" id="cardbody1">
                                  <div className="col-md-5">
                                  <h5 id="cardtitle1" className="card-title ">{product.itemName}</h5>
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-5">
                                    <span><h4 id="cardprice1"><i className="fa-solid fa-indian-rupee-sign"></i>{product.itemPrice}</h4></span>
                                    </div>                               
                                </div>
                                <div className="mb-4 d-flex justify-content-around ">                                  
                                  <button className="btn btn-primary   " id="addcartbtn1" onClick={(e) => handleAddToCart(e, product._id)}>Add To Cart</button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      </div>
  
        ) : (
          <p>No Product Found</p> 
        )}
      </div>
    </div>
      
  );
  
  
}
