import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../vendor/AddProductSlice'
import authReducer from '../auth/AuthSlice'
import cartReducer from '../cart/CartSlice'
import orderReducer from '../order/OrderSlice'
export default configureStore({
  reducer: {
    product:productReducer,
    auth:authReducer,
    cart:cartReducer,
    order:orderReducer
  },
})