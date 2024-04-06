import React,{ useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { AddProductAsync } from '../AddProductSlice';
import { useNavigate } from 'react-router-dom';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { VendorSidebar } from '../../navbar/VendorSidebar';
import { VendorNavbar } from '../../navbar/VendorNavbar';
import '../../style/vendor/product.css'
function AddProduct(){
    const user = useSelector(selectLoggedInUser);
    const navigate=useNavigate();
    const [itemName,setItemName]=useState('');
    const [itemPrice,setItemPrice]=useState('');
    const [itemImage,setItemImage]=useState(null);
    const [itemType,setItemType]=useState('');
    const dispatch=useDispatch();
    const pagetitle='Add Product';

function handleitemName(e){
  setItemName(e.target.value);
}
function handleitemPrice(e){
    setItemPrice(e.target.value);
}
function handleitemImage(e){
    setItemImage(e.target.files[0]);
}
function handleitemType(e){
    setItemType(e.target.value);
}
function  handleSubmit(e){
    e.preventDefault();
    const formData=new FormData();
    formData.append("itemName",itemName)
    formData.append("itemPrice",itemPrice)
    formData.append("itemImage",itemImage)
    formData.append("itemType",itemType)
    
   dispatch(AddProductAsync(formData));
   {user && navigate(`/Vendor`)}
}

        return (
            <div className='container-fluid  min-vh-100' id='vendor-background'>
  <div className='row'>
    
      <div className='col-4 col-md-2  vh-100  position-fixed' id="sidebar-wrapper">
        <VendorSidebar/>
      </div>
    <div className='col-4 bg-info col-md-2'></div>
    <div className='col' style={{'padding':'0' }}>
    <VendorNavbar pagetitle={pagetitle}  />
    <div className='px-3'>
 
  <div className='container-fluid'>
    
    <div className='row my-5 g-3 pt-5'  >
    <div className='container' >
    <div className='row justify-content-center'>
    <div className='col-md-6 card' id='vendor-addproduct'>
        <form enctype="multipart/form-data" onSubmit={handleSubmit}>
            <div className='row m-4 justify-content-center'>
            <div className='col-md-6 '>
            <h3>Add Product</h3>
            </div>
        </div>
        <div className='row m-4'>
            <div className='col-md-4 '>
            <label htmlFor="itemName">Name</label>
            </div>
            <div className='col-md-8'>
            <input className="form-control" type='text' name='itemName' id="itemName" value={itemName} onChange={handleitemName}></input>
            </div>
        </div>
        <div className='row m-4'>
            <div className=' col-md-4'>
            <label htmlFor="itemPrice">Price</label>
            </div>
            <div className='col-md-8'>
            <input className="form-control" type='number' name='itemPrice' id="itemPrice" value={itemPrice} onChange={handleitemPrice} ></input>
            </div>
        </div>
        <div className='row m-4'>
            <div className='col-md-4'>
            <label htmlFor="itemType">Type</label>
            </div>
            <div className='col-md-8'>
            <select className="form-control" id='itemType' value={itemType} onChange={handleitemType} >
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
            <input className="form-control" type='file' name='itemImage' id="itemImage"  onChange={handleitemImage}></input>
            </div>
        </div>
        <div className='row m-4'>
            <div className='col-md-4'></div>
            <div className='col-md-8'>
            <button type="submit" className='btn btn-success w-100'>+ Add</button>
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
export default  AddProduct;