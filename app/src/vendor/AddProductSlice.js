import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {AddProductapi,fetchAllProduct,deleteProduct,updateProduct,fetchAllProductForHome} from "./AddProductAPI";
const initialState={
    status:'idle',
    value:0,
    items:[],
}


export const AddProductAsync=createAsyncThunk(
    'product/AddProductapi',
    async(formData)=>{
    const response=await AddProductapi(formData);
    return response.data;
});

export const fetchAllProductAsync=createAsyncThunk(
    'product/fetchAllProduct',
    async()=>{
        const response=await fetchAllProduct();
        return response.data;
    }
);

export const deleteProductAsync=createAsyncThunk(
    'product/deleteProduct',
    async(itemid)=>{
        const response= await deleteProduct(itemid);
        return response.data;
    }
)

export const UpdateProductAsync=createAsyncThunk(
    'product/updateProduct',
  async(updatedData)=>{
    const  response=await updateProduct(updatedData);
    return response.data;
  }
)

export const fetchAllProductForHomeAsync=createAsyncThunk(
    'product/fetchAllProductForHome',
    async()=>{
        const response=await fetchAllProductForHome();
        return response.data;
    }
    )

export const AddProductSlice=createSlice({
    name:'product',
    initialState,
    reducers : {
        increament:(state)=>{
            state.value+=1;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(AddProductAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(AddProductAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.items.push(action.payload);
        })
        .addCase(fetchAllProductAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchAllProductAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.items=action.payload;
        })
        .addCase(deleteProductAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(deleteProductAsync.fulfilled,(state,action)=>{
            state.status='idle';
            const index=state.items.findIndex(item=>item._id===action.payload._id)
            state.items.splice(index,1);
        })
        .addCase(UpdateProductAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(UpdateProductAsync.fulfilled,(state,action)=>{
            state.status='idle';
           const index=state.items.findIndex(item=>item._id===action.payload._id)
           state.items[index]=action.payload;
        })
        .addCase(fetchAllProductForHomeAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchAllProductForHomeAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.items=action.payload;
            console.log(action.payload)
        })
        ;
    }
});

export const { increment  } = AddProductSlice.actions;
export const selectAllProduct=(state)=>state.product.items;
export default AddProductSlice.reducer;