import { useEffect,useState } from "react";
import { fetchAllProductForHomeAsync, selectAllProduct, selectProductStatus } from "../vendor/AddProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../auth/AuthSlice";
import { addToCartAsync } from "../cart/CartSlice";
import { Link } from "react-router-dom";
import { CustomerNavbar } from "../navbar/CustomerNavbar";
import'../style/customer/home.css'
import { Buffer } from "../page/Buffer";
import CustomerSideFooter from "../footer/CustomerSideFooter";

export default function Decoration() {
  const dispatch = useDispatch();
  const status=useSelector(selectProductStatus);
  const products = useSelector(selectAllProduct);
  const user = useSelector(selectLoggedInUser);
  const productsByCategory = products.filter(product => product.itemType === 'catering')
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    let timer;
    if (isVisible) {
     
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    }
    
    
    return () => clearTimeout(timer);
  }, [isVisible]);
  useEffect(() => {
    if(user){
      dispatch(fetchAllProductForHomeAsync())
    }  
  }, [dispatch]);
  function handleAddToCart(e, _id) {
    setIsVisible(true)
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
      {isVisible && <div  className="add-to-cart-popup">Added To Cart</div>}
      <div className="row px-5 pt-4 pb-4 shadow-sm rounded">
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
      <div className="row p-4 text-center justify-content-center category-heading">
        <div className="col-md-8">
        <h1>Indulge Your Guests with Customized Catering Option</h1>
        </div>
      </div>
     
      <div className="row border border-success mx-4 px-2 py-4">
      {
      status && status!='loading'?
      products && products.length >0 ? (
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
                                  <button className="btn btn-primary  " id="addcartbtn1" onClick={(e) => handleAddToCart(e, product._id)}>Add To Cart</button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      </div>
  
        ) : (
          <p>No Product Found</p>
        ):
        <Buffer/>
      }
      </div>
      <div className="row">
        <CustomerSideFooter/>
      </div>
    </div>
      
  );
  
  
}
