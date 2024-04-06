import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {createOrder,fetchUserOrder} from './OrderAPI'
import { createVendorSideOrder,fetchVendorSideOrder,updateVendorSideOrder
         ,deleteVendorSideOrder,fetchSingleVendorSideOrder, fetchCustomerCurrentOrder} from './OrderAPI'
const  initialState={
    status:'idle',
    value:0,
    orders:[],
    currentOrder:null,
    vendorSideOrder:[],
    singleVendorSideOrder:null,
    customerCurrentOrder:[],
}

export const  createOrderAsync=createAsyncThunk('order/createOrder',
async(orderData)=>{
    const response=await createOrder(orderData);
    return response.data;
})
export const  fetchUserOrderAsync=createAsyncThunk('order/fetchUserOrder',
async()=>{
    const response=await fetchUserOrder();
    return response.data;

});


export const createVendorSideOrderAsync=createAsyncThunk(
    'order/createVendorSideOrder',
    async(vendorsideOrder)=>{
        const response=await createVendorSideOrder(vendorsideOrder);
        return response.data;
    }
)
export const fetchVendorSideOrderAsync=createAsyncThunk(
    'order/fetchVendorSideOrder',
    async()=>{
        const response=await fetchVendorSideOrder();
        return response.data;
    }
)
export const fetchCustomerCurrentOrderAsync=createAsyncThunk(
    'order/fetchCustomerCurrentOrder',
    async()=>{
        const response=await fetchCustomerCurrentOrder();
        return response.data;
    }
)
export const fetchSingleVendorSideOrderAsync=createAsyncThunk(
    'order/fetchSingleVendorSideOrder',
    async(_id)=>{
        const response=await fetchSingleVendorSideOrder(_id);
        return response.data;
    }
)

export const updateVendorSideOrderAsync=createAsyncThunk(
    'order/updateVendorSideOrder',
    async(vendorSideProduct)=>{
        const response=await updateVendorSideOrder(vendorSideProduct);
        return response.data;
    }
)
export const deleteVendorSideOrderAsync=createAsyncThunk(
    'order/deleteVendorSideOrder',
    async(vendor_id)=>{
        const response=await deleteVendorSideOrder(vendor_id);
        return response.data;
    }
)

export const orderSlice=createSlice({
    name:'order',
    initialState,
    reducers:{
        increament:(state)=>{
            state.value+=1;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createOrderAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(createOrderAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.orders.push(action.payload);
            state.currentOrder=action.payload.products;
        })
        .addCase(fetchUserOrderAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchUserOrderAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.orders=action.payload;
        })
        .addCase(createVendorSideOrderAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(createVendorSideOrderAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.vendorSideOrder.push(action.payload)
        })
        
        .addCase(fetchVendorSideOrderAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchVendorSideOrderAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.vendorSideOrder=action.payload;
        })
        .addCase(fetchCustomerCurrentOrderAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchCustomerCurrentOrderAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.customerCurrentOrder=action.payload;
        })
        .addCase(fetchSingleVendorSideOrderAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchSingleVendorSideOrderAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.singleVendorSideOrder=action.payload;
        })
        .addCase(updateVendorSideOrderAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(updateVendorSideOrderAsync.fulfilled,(state,action)=>{
            state.status='idle';
            const index=state.vendorSideOrder.findIndex((item)=>item._id===action.payload._id)
            state.vendorSideOrder[index]=action.payload;
        })
        .addCase(deleteVendorSideOrderAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(deleteVendorSideOrderAsync.fulfilled,(state,action)=>{
            state.status='idle';
            const index=state.vendorSideOrder.findIndex((item)=>item._id===action.payload._id)
            state.vendorSideOrder.splice(index,1);
        })
        
    }
})

export const selectUserOrder=(state)=>state.order.orders;
export const selectCurrentOrder=(state)=>state.order.currentOrder;
export const selectVendorSideOrder=(state)=>state.order.vendorSideOrder;
export const selectSingleVendorSideOrder=(state)=>state.order.singleVendorSideOrder;
export const selectCustomerCurrentOrder=(state)=>state.order.customerCurrentOrder;

export default orderSlice.reducer;