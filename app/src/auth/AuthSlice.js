import { createSlice,createAsyncThunk ,isRejected} from "@reduxjs/toolkit";
import { createUser,loginUser,signOut,updateUser,checkAuth,userInfo} from "./AuthAPI";
const initialState={
    status:'idle',
    loggedInUserToken: null,
    value:0,
    error:null,
    userChecked:false,
    userInfos:null,
}
 
export const createUserAsync=createAsyncThunk(
    'auth/createUser',
    async(userData)=>{
        try{
            const response = await createUser(userData,{isRejected});
            return response.data;
          }catch(error){
           return isRejected(error);
          }
    }
)

export const loginUserAsync=createAsyncThunk(
    'auth/loginUser',
    async(userData)=>{
        try{
            const response = await loginUser(userData,{isRejected});
            return response.data;
          }catch(error){
           return isRejected(error);
          }
    }
)

export const signoutAsync=createAsyncThunk(
    'auth/signOut',
    async (userData)=>{
        const response= await signOut(userData);
        return response.data;
    }
)
export const checkAuthAsync = createAsyncThunk(
    'user/checkAuth',
    async () => {
      try {
        const response = await checkAuth();
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );
  export const userInfoAsync=createAsyncThunk('auth/userInfo',
     async()=>{
        try{
            const response = await userInfo();
        return response.data;
        }catch(error){
            console.log(error);
        }
        
     }
)

export const updateUserAsync=createAsyncThunk('auth/updateUser',
     async(userData)=>{
        const response = await updateUser(userData);
        return response.data;
     }
)

export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
       increment:(state)=>{
        state.value+=1;
       },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createUserAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(createUserAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.loggedInUserToken=action.payload;
        })
        .addCase(createUserAsync.rejected,(state,action)=>{
            state.status='idle';
            state.error=action.payload;
        })
        .addCase(loginUserAsync.pending,(state)=>{
            state.status='pending';
        })
        .addCase(loginUserAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.loggedInUserToken=action.payload;
        })
        .addCase(loginUserAsync.rejected,(state,action)=>{
            state.status='idle';
            state.error=action.payload;
        })
        .addCase(signoutAsync.pending,(state)=>{
            state.status='pending';
        })
        .addCase(signoutAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.loggedInUserToken=null;
        })
        .addCase(checkAuthAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(checkAuthAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.loggedInUserToken = action.payload;
            state.userChecked = true;
          })
          .addCase(checkAuthAsync.rejected, (state, action) => {
            state.status = 'idle';
            state.userChecked = true;
          })
        .addCase(userInfoAsync.pending,(state)=>{
            state.status='pending';
        })
        .addCase(userInfoAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.userInfos=action.payload;
        })
        .addCase(updateUserAsync.pending,(state)=>{
            state.status='pending';
        })
        .addCase(updateUserAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.loggedInUserToken=action.payload;
        })
    }
})

export const selectLoggedInUser=(state)=>state.auth.loggedInUserToken;
export const selectError=(state)=>state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectUserInfo = (state) => state.auth.userInfos;

export default  authSlice.reducer;