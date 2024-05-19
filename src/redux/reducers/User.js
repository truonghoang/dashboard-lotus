import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  token: null,
  email: null,
  detail: {},
  error: false,
  errMess: null,
  page: 1,
  limit:20,
  select:[],
  data:[]
 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
    },
    logoutRequest: (state) => {
      state.isLoading = true;
    },
    registerRequest: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },

    listUserRequest: (state)=>{
      state.isLoading= true
      },
    listUserSuccess: (state,action) =>{
      state.isLoading = false,
      state.data =action.payload.data,
      state.page =action.payload.page,
      state.limit =action.payload.limit
    },
    detailUserRequest: (state)=>{
      state.isLoading =true
    },
    detailUserSuccess : (state,action)=>{
      state.detail =action.payload
    },
    selectUserRequest:(state)=>{
 state.isLoading= true
    },
    searchUserRequest:(state)=>{
      state.isLoading = true
    },
    searchUserSuccess: (state,action)=>{
      state.isLoading =false,
      state.data = action.payload
    },
    selectUserSuccess: (state,action)=>{
      state.select =action.payload
      state.isLoading =false
    },
    closeDetailUser :(state)=>{
      state.detail ={}
    },
    requestFailure: (state,action) =>{
      state.isLoading = false,
      state.error = true,
      state.errMess = action.payload
    }

  },
});

export const {closeDetailUser,
  logoutRequest,
  registerRequest,
  loginRequest,
  loginSuccess,
  requestFailure,
  listUserRequest,
  listUserSuccess,
  detailUserRequest,detailUserSuccess,selectUserRequest,selectUserSuccess,searchUserRequest,searchUserSuccess
 
} = userSlice.actions;
export default userSlice.reducer;
