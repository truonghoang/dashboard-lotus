import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  token: null,
  email: null,
  detail: null,
  error: false,
  errMess: null,
  page: 1,
  limit:20,
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
    requestFailure: (state,action) =>{
      state.isLoading = false,
      state.error = true,
      state.errMess = action.payload
    }

  },
});

export const {
  logoutRequest,
  registerRequest,
  loginRequest,
  loginSuccess,
  requestFailure,
  listUserRequest,
  listUserSuccess,
 
} = userSlice.actions;
export default userSlice.reducer;
