import React,{useEffect} from 'react';
import AddProduct from './vendor/component/AddProduct';
import Product from './vendor/component/Product';
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import UpdateProduct from './vendor/component/UpdateProduct';
import Login from './auth/component/Login';
import Signup from './auth/component/Signup';
import Protected from './auth/component/Protected';
import { selectUserChecked,checkAuthAsync, loginUserAsync, userInfoAsync, selectUserInfo } from './auth/AuthSlice';
import NotFoundPath from './NotFoundPath';
import { useDispatch,useSelector } from 'react-redux';
import CustomerOrder from './order/component/CustomerOrder';
import Home from './customer/Home';
import Cart from './cart/Cart';
import Checkout from './cart/Checkout';
import { VenderSideCustomerOrder } from './vendor/component/VenderSideCustomerOrder';
import { UpdateOrderStatus } from './vendor/component/UpdateOrderStatus';
import { CustomerProfile } from './customer/CustomerProfile';


import { SucessOrder } from './sucesspage/SucessOrder';
import Catering from './customer/Catering';
import Decoration from './customer/Decoration';
import Music from './customer/Music';
import Venue from './customer/Venue';
import { Logout } from './auth/component/Logout';
const router=createBrowserRouter([
  {
  path:'/Vendor/addproduct',
  element:(
    <Protected>
       <AddProduct/>
    </Protected>
  ),
},
{
  path:'/Vendor',
  element:(
    <Protected>
       <Product/>
    </Protected>
  ),
},
{
path:'/logout',
element:(
  <Protected>
     <Logout/>
  </Protected>
),
},
{
  path:"/Vendor/updateproduct/:_id",
  element:(
    <Protected>
       <UpdateProduct/>
    </Protected>
    
  )
},
{
  path:'/login',
  element:(
    <Login/>
  )
},
{
  path:'/signup',
  element:(
    <Signup/>
  )
},
{
  path:'/Customer',
  element:(
    <Home></Home>
  )
},
{
  path:'/User/catering',
  element:(
   <Catering/>
  )
},
{
  path:'/User/decoration',
  element:(
    <Decoration/>
  )
},
{
  path:'/User/music',
  element:(
    <Music></Music>
  )
},
{
  path:'/User/venue',
  element:(
    <Venue></Venue>
  )
},
{
  path:'/Vendor/statusupdate/:_id',
  element:(
    <UpdateOrderStatus/>
  )
},
{
  path:'/Vendor/customerorder',
  element:(
    <VenderSideCustomerOrder/>
  )
},
{
  path:'/User/profile',
  element:(
    <CustomerProfile/>
  )
},
{
  path:'/User/cart',
  element:(
    <Cart/>
  )
},
{
  path:'/User/checkout',
  element:(
    <Checkout/>
  )
},
{
  path:'/User/successorder',
  element:(
    <SucessOrder/>
  )
},
{
  path:'/User/order',
  element:(
    <CustomerOrder/>
  )
},

{
  path:'*',
  element:(
    <Protected>
      <NotFoundPath></NotFoundPath>
    </Protected>
  )
},

])
function App() {
  const dispatch = useDispatch();
  const userChecked = useSelector(selectUserChecked);
  const user=useSelector(selectUserInfo);
  useEffect(()=>{
      dispatch(userInfoAsync())
  },[dispatch])
  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[dispatch])
 
  return (
    <div>
      {userChecked && <RouterProvider router={router} />}
    </div>
  );
}

export default App;
