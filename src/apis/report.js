import { ApiClient } from "./";
// lấy danh sách báo báo cho trang dashboard và sắp xếp theo mới nhất và lâu nhất
const listReport = (payload) =>ApiClient.get(`/api/report?page=${payload.page}&limit=${payload.limit}&sort=${payload.orderBy}`);

// lấy danh sách báo cáo được lọc theo lí do
const filterByReason = payload=>ApiClient.get(`/api/report/filter?page=${payload.page}&limit=${payload.limit}&reason=${payload.reason}`)

// tìm kiếm user theo tên hoặc số điện thoại
const searchReport =payload =>ApiClient.get(`/api/report/search?page=${payload.page}&limit=${payload.limit}&keySearch=${payload.keySearch}`)

// lấy chi tiết báo cáo trong trang dashboard
const detailReport = (payload) => ApiClient.get(`/api/report/${payload.id}`);

// lấy danh sách các bí danh từ detail dashboard
const getListLinkOfAccount =(payload) =>ApiClient.get(`/api/report/detail/alias?id=${payload.id}`)

// lấy danh sách các tài khoản có cùng số điện thoại
const getListAccountPhoneOfAccount =(payload) =>ApiClient.get(`/api/report/detail/account?phone=${payload.phone}`)

//lấy danh sách các tố cáo user chỉ định
const getListReportByPeerId =payload =>ApiClient.get(`/api/report/reported-user/list?id=${payload.id}`)

// đánh dấu đã đọc báo cáo vi phạm
const processReadReport = payload=>ApiClient.post(`/api/report/process`,payload)

// lấy danh sách lịch sử ban unban của 1 tài khoản
const getHistoryByPeerId = payload =>ApiClient.get(`/api/report/history/${payload.id}`)

// lấy danh sách báo cáo của người báo cáo
const getReportByReporter = payload =>ApiClient.get(`/api/report/reporter/${payload.id}?sort=${payload.orderBy}`)

// lọc danh sách theo lí do của người báo cáo
const filterReportOfReporterByReason = payload =>ApiClient.get(`api/report/reporter/filter?id=${payload.id}&reason=${payload.reason}`)

// lấy danh sách cáo báo cáo về người bị báo cáo
const getListReportOfReportedUser =payload =>ApiClient.get(`/api/report/reported-user/list?id=${payload.id}`)

// xem chi tiết về báo cáo của người bị báo cáo
const detailReportedUser = payload =>ApiClient.get(`/api/report/reported-user/${payload.id}`)

// từ chối hoặc chấp thuận user báo cáo

const accountOrDeniedReport =payload=> ApiClient.delete(`/api/report/${payload.id}/${payload.process}`)

// lọc danh sách user ban theo

const filterByReasonReportedUser =payload =>ApiClient.get(`/api/report/reported-user/list/filter?id=${payload.id}&reason=${payload.reason}`)

export { listReport, detailReport,getListReportByPeerId,getListLinkOfAccount,getListAccountPhoneOfAccount,filterByReason,searchReport,
  processReadReport,getHistoryByPeerId,getReportByReporter,filterReportOfReporterByReason,getListReportOfReportedUser,detailReportedUser,accountOrDeniedReport,filterByReasonReportedUser
};
