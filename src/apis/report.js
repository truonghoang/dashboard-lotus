import { ApiClient } from "./";

const listReport = (payload) =>
  ApiClient.get(`/api/report?page=${payload.page}&limit=${payload.limit}`);

const detailReport = (payload) => ApiClient.get(`/api/report/${payload.id}`);

const getListLinkOfAccount =(payload) =>ApiClient.get(`/api/report/detail/link?id=${payload.id}`)
const getListAccountPhoneOfAccount =(payload) =>ApiClient.get(`/api/report/detail/account?phone=${payload.phone}`)

const getListReportByPeerId =payload =>ApiClient.get(`/api/report/detail/list?id=${payload.id}`)
export { listReport, detailReport,getListReportByPeerId,getListLinkOfAccount,getListAccountPhoneOfAccount };
