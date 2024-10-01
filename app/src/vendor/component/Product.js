import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllProductAsync, selectAllProduct ,deleteProductAsync,selectProductStatus} from "../AddProductSlice";
import {Link, useNavigate} from 'react-router-dom'
import { selectLoggedInUser } from "../../auth/AuthSlice";
import NotFoundPath from "../../NotFoundPath";
import { VendorSidebar } from "../../navbar/VendorSidebar";
import { VendorNavbar } from "../../navbar/VendorNavbar";
import '../../style/vendor/product.css'
import { Buffer } from "../../page/Buffer";
import VendorSideFooter from "../../footer/VendorSideFooter";
export default function Product() {
  const dispatch = useDispatch();
  const status=useSelector(selectProductStatus);
  const products = useSelector(selectAllProduct);
  const user=useSelector(selectLoggedInUser)
  const  navigate =useNavigate();
  const pagetitle='Products';
  useEffect(() => {
    
      dispatch(fetchAllProductAsync());
  }, [dispatch]);
   function handleclick(e,_id){
    dispatch(deleteProductAsync(_id));
   
   }
   function handleupdate(e,_id){
    {user && navigate(`/Vendor/updateproduct/${_id}`)}
   }
  
  return (
    <div className='container-fluid  min-vh-100' id='vendor-background'>
  <div className='row' >
   
      <div className='col-4 col-md-2  vh-100  position-fixed' id="sidebar-wrapper">
        <VendorSidebar/>
      </div>
    
     <div className='col-4 bg-info  col-md-2'></div>
    <div className='col' style={{'padding':'0' }}>
    <VendorNavbar pagetitle={pagetitle} />
    <div className='px-3'>
      
  {status!='loading' ?
  <div className='container-fluid '>
    <div className='row g-3 pt-5 my-2 justify-content-center'>
      <div className="col-md-12 col-sm-12 ">
      <table class="table caption-top table-hover table-striped ">
      <caption className='text-white fs-4'>Product List</caption>
  <thead>
    <tr>
      <th scope="col">SL</th>
      <th scope="col">Product</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Action1</th>
      <th scope="col">Action2</th>
    </tr>
  </thead>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product,index) => (
    
  <tbody key={product._id}>
    <tr>
      <th scope="row">{index+1}</th>
      <td><img src={product.itemImage} id='vendor-item-image'  className='img-fluid ' height={80} width={80}  alt="image" /></td>
      <td><p>{product.itemName}</p></td>
      <td><small><i class="fa-solid fa-indian-rupee-sign"></i> {product.itemPrice}</small></td>
      <td><button className="btn btn-secondary" onClick={e=>handleupdate(e,product._id)}>Update</button></td>
      <td><button className="btn btn-secondary" onClick={e=>handleclick(e,product._id)}>Delete</button></td>
      
    </tr>
  </tbody>
       
        ))
      ) : (
      <p>No Product Found</p>
      )}
      </table>
      </div>
      </div>
    </div>
    :<div className="mt-4 pt-4"><Buffer/></div>
  }
   
  </div>
  <VendorSideFooter/>
</div>
    </div>
  </div>
   
  );
}
