import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  detail: {},
  detailLink: [],
  detailAccount: [],
  error: false,
  errMess: null,
  page: 1,
  limit: 20,
  totalPage: 1,
  data: [],
};

const reporterSlice = createSlice({
  name: "reporter",
  initialState,
  reducers: {
    requestFailure: (state, action) => {
      state.isLoading = false;
      state.errMess = action.payload;
      state.error = true;
    },
    listReportOfReporterRequest: (state) => {
      state.isLoading = true;
    },
    detailReportOfReporterRequest: (state) => {
      state.isLoading = true;
    },
    detailReportOfReporterSuccess: (state, action) => {
      (state.isLoading = false), (state.detail = action.payload);
    },
    listReportOfReporterSuccess: (state, action) => {
      (state.isLoading = false),
        (state.data = action.payload.data),
        (state.page = action.payload.page),
        (state.limit = action.payload.limit);
      state.totalPage = action.payload.totalPage;
    },

    closeDetail: (state) => {
      state.detail = {};
    },

    filterByReasonRequest: (state) => {
      state.isLoading = true;
    },
    filterByReasonSuccess: (state, action) => {
      (state.isLoading = false),
        (state.data = action.payload.data),
        (state.page = action.payload.page),
        (state.limit = action.payload.limit);
      state.totalPage = action.payload.totalPage;
    },
  },
});

export const {
  filterByReasonRequest,
  filterByReasonSuccess,
  listReportOfReporterRequest,
  listReportOfReporterSuccess,
  detailReportOfReporterRequest,
  detailReportOfReporterSuccess,
  closeDetail,
  requestFailure,
} = reporterSlice.actions;
export default reporterSlice.reducer;
