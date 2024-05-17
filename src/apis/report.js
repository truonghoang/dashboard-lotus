import { ApiClient } from "./";

const listReport = (payload) =>
  ApiClient.get(`/api/report?page=${payload.page}&limit=${payload.limit}`);

const detailReport = (payload) => ApiClient.get(`/api/report/${payload.id}`);


export { listReport, detailReport };
