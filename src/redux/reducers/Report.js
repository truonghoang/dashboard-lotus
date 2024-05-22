import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  detail: {},
  detailLink: [],
  detailAccount:[],
  error: false,
  errMess: null,
  page: 1,
  limit: 20,
  totalPage: 1,
  data: [],
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    requestFailure: (state, action) => {
      state.isLoading = false;
      state.errMess = action.payload;
      state.error = true;
    },
    listReportRequest: (state) => {
      state.isLoading = true;
    },
    detailReportRequest: (state) => {
      state.isLoading = true
    },
    detailReportSuccess: (state, action) => {
      state.isLoading = false,
        state.detail = action.payload
    },
    listReportSuccess: (state, action) => {
      (state.isLoading = false),
        (state.data = action.payload.data),
        (state.page = action.payload.page),
        (state.limit = action.payload.limit);
      (state.limit) = action.payload.totalPage
    },
    deleteReportRequest: (state) => {
      state.isLoading = true

    },
    closeDetail:(state)=>{
      state.detail ={}
    },
    deleteReportSucess: (state) => {
      state.isLoading = false
    },
    reportRequest: (state) =>{
      state.isLoading =true
    },
    detailLinkReportedRequest:(state)=>{
      state.isLoading =true
    },
    detailLinkReportedSuccess: (state,action)=>{
      state.isLoading =false,
      state.detailLink=action.payload
    },
    detailAccountReportedRequest:(state)=>{
      state.isLoading =true
    },
    closeDetailLinkAndLink:(state)=>{
      state.detailLink =[],
      state.detailAccount=[]
    },
 
    detailAccountReportedSuccess: (state,action)=>{
      state.isLoading =false,
      state.detailAccount=action.payload
    },
    reportSuccess: (state)=>{
      state.isLoading = false
    }
  },
});

export const {closeDetailLinkAndLink,detailAccountReportedRequest,detailAccountReportedSuccess,detailLinkReportedRequest,detailLinkReportedSuccess,closeDetail,reportRequest,reportSuccess, requestFailure, listReportRequest, listReportSuccess, detailReportRequest, detailReportSuccess, deleteReportRequest, deleteReportSucess } =
  reportSlice.actions;
export default reportSlice.reducer;
