import { selectAllProduct,UpdateProductAsync } from "../AddProductSlice";
import { useParams,useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux";
import { useState } from "react";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { VendorSidebar } from "../../navbar/VendorSidebar";
import { VendorNavbar } from "../../navbar/VendorNavbar";
import '../../style/vendor/product.css'
export default function UpdateProduct(){
    const {_id}=useParams();
    const numberIndex=_id
    const dispatch=useDispatch();
    const products=useSelector(selectAllProduct);
    const user=useSelector(selectLoggedInUser)
    const navigate=useNavigate();
    const productToUpdate=products.find((item)=>item._id===numberIndex)
    const [itemName,setItemName]=useState(productToUpdate?productToUpdate.itemName:'');
    const [itemPrice,setItemPrice]=useState(productToUpdate?productToUpdate.itemPrice:'');
    const [itemType,setItemType]=useState(productToUpdate?productToUpdate.itemType:'');
    const [itemImage,setItemImage]=useState(productToUpdate?productToUpdate.itemImage:null);
   
  
    function handleitemName(e){
        setItemName(e.target.value);
      }
      function handleitemPrice(e){
          setItemPrice(e.target.value);
      }
      function handleitemType(e){
        setItemType(e.target.value);
    }
      function handleitemImage(e){
          setItemImage(e.target.files[0]);
      }
      function  handleSubmit(e){
          e.preventDefault();
          const formData=new FormData();
    formData.append("_id",numberIndex)
    formData.append("itemName",itemName)
    formData.append("itemPrice",itemPrice)
    formData.append("itemType",itemType)
    formData.append("itemImage",itemImage)

         dispatch(UpdateProductAsync(formData));
         {user && navigate(`/Vendor`)}
      }
    const pagetitle='Update Product';
      
    return(
    
    <div className='container-fluid min-vh-100' id='vendor-background'>
    <div className='row'>
     
        <div className='col-4 col-md-2  vh-100  position-fixed' id="sidebar-wrapper">
          <VendorSidebar/>
        </div>
      
       <div className='col-4  col-md-2'></div>
      <div className='col' style={{'padding':'0' }}>
      <VendorNavbar pagetitle={pagetitle} />
      <div className='px-3'>
   
    <div className='container-fluid'>
      <div className='row my-5 g-3 pt-5'>
    <div className='container'>
    <div className='row justify-content-center'>
    <div className='col-md-6 card'  id='vendor-updateproduct'>
    <form enctype="multipart/form-data" onSubmit={e=>handleSubmit(e)}>
            <div className='row m-4 justify-content-center'>
            <div className='col-md-8 '>
            <h3>Update Product</h3>
            </div>
        </div>
        <div className='row m-4'>
            <div className='col-md-4 '>
            <label htmlFor="itemName">Name</label>
            </div>
            <div className='col-md-8'>
            <input className="form-control" type="text" name="itemName" id="itemName" value={itemName  } onChange={handleitemName} />
            </div>
        </div>
        <div className='row m-4'>
            <div className=' col-md-4'>
            <label htmlFor="itemPrice">Price</label>
            </div>
            <div className='col-md-8'>
            <input className="form-control"  type="text" name="itemPrice" id="itemPrice" value={itemPrice } onChange={handleitemPrice} />
            </div>
        </div>
        <div className='row m-4'>
            <div className='col-md-4'>
            <label htmlFor="itemType">Type</label>
            </div>
            <div className='col-md-8'>
            <select className="form-control" name="itemType" id='itemType' value={itemType} onChange={handleitemType} >
                <option>Select</option>
                <option value='venue'>Venue</option>
                <option value='catering'>Catering</option>
                <option value='decoration'>Decoration</option>
                <option value='music'>Music</option>
            </select>
            </div>
        </div>
        <div className='row m-4'>
            <div className='col-md-4'>
            <label htmlFor="itemImage">Image</label>
            </div>
            <div className='col-md-8'>
            <input  className="form-control" type="file" name="itemImage" id="itemImage"  onChange={handleitemImage} />
            </div>
        </div>
        <div className='row m-4'>
            <div className='col-md-4'></div>
            <div className='col-md-8'>
            <button type="submit" className='btn btn-success w-100'>Update</button>
            </div>
        </div>
      </form>
                </div>
            
            </div>
        </div>
    
    </div>
    </div>
  </div>
      </div>
    </div>
  </div>
        
    )
}