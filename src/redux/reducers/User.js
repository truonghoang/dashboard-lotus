import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  token: null,
  email: null,
  detail: {},
  error: false,
  errMess: null,
  page: 1,
  limit:10,
  select:[],
  data:[],totalPage:1,
  history: []
 
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
    searchUserBannedRequest:(state)=>{
      state.isLoading=true
    },
    searchUserBannedSuccess:(state,action)=>{
      state.isLoading=false
      state.data =action.payload.data,
      state.page=action.payload.page,
      state.limit=action.payload.limit,
      state.totalPage=action.payload.totalpage
    },
    listReportUserRequest: (state)=>{
      state.isLoading= true
      },
    listReportUserSuccess: (state,action) =>{
      state.isLoading = false,
      state.data =action.payload.data
      
    },
    listUserBanRequest: (state)=>{
      state.isLoading= true
      },
    listUserBanSuccess: (state,action)=>{
      state.isLoading=false
      state.data =action.payload.data,
      state.page=action.payload.page,
      state.limit=action.payload.limit,
      state.totalPage=action.payload.totalPage
    },
    historyUserBannedRequest: (state)=>{
      state.isLoading =true
    },
    historyUserBannedSuccess:(state,action)=>{
      state.isLoading=false,
      state.history =action.payload
    },
    filterReportRequest:(state)=>{
      state.isLoading =true
    },
    filterReportSuccess:(state,action)=>{
      state.isLoading =false,
      state.data= action.payload.data
    },

    closeDetailUser :(state)=>{
      state.detail ={}
    },
    requestFailure: (state,action) =>{
      state.isLoading = false,
      state.error = true,
      state.errMess = action.payload
    },
    unBanUserRequest:(state)=>{
      state.isLoading =true
    },
    unBanUserSuccess: (state)=>{
      state.isLoading =false
    }

  },
});

export const {unBanUserRequest,unBanUserSuccess,
  filterReportRequest,filterReportSuccess,
  listUserBanRequest,listUserBanSuccess,
  closeDetailUser,
  logoutRequest,
  registerRequest,
  loginRequest,
  loginSuccess,
  requestFailure,
  listReportUserRequest,
  listReportUserSuccess,
  searchUserBannedRequest,
  searchUserBannedSuccess,
  historyUserBannedRequest,
  historyUserBannedSuccess
 
} = userSlice.actions;
export default userSlice.reducer;
