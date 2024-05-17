import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  detail: null,
  error: false,
  errMess: null,
  page: 1,
  limit: 20,
  totalPage:1,
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
    detailReportRequest: (state)=>{
        state.isLoading = true
    },
    detailReportSuccess: (state,action)=>{
        state.isLoading = false,
        state.detail =action.payload
    },
    listReportSuccess: (state, action) => {
      (state.isLoading = false),
        (state.data = action.payload.data),
        (state.page = action.payload.page),
        (state.limit = action.payload.limit);
        (state.limit) = action.payload.totalPage
    },
  },
});

export const { requestFailure, listReportRequest, listReportSuccess,detailReportRequest,detailReportSuccess } =
  reportSlice.actions;
export default reportSlice.reducer;
