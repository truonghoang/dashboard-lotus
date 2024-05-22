import { put, takeEvery, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import { listReport, detailReport,getListReportByPeerId,getListLinkOfAccount,getListAccountPhoneOfAccount } from "@/apis/report";
import * as actions from "../reducers/Report";

function* listReportSaga({ payload }) {
  try {
    const res = yield listReport(payload);
    if (res.status == 0) {
      yield put(actions.requestFailure(res.message));
    } else {
      yield put(
        actions.listReportSuccess({
          data: res.response.data,
          limit: res.response.limit,
          page: res.response.page,
          totalPage: res.response.totalPage,
        })
      );
    }
  } catch (error) {
    yield put(actions.requestFailure(error));
  }
}

function* detailReportSaga({ payload }) {
  try {
    const res = yield detailReport(payload);
    if (res.code == 0) {
      yield put(actions.requestFailure(res.message));
    } else {
      const dataDetail = res.response;
      const information = {
        name: `${dataDetail.last_name} ${dataDetail.first_name}`,
        phone: dataDetail.phone,
        total_Link: dataDetail.totalLink,
        total_Account: dataDetail.totalAccount,
        peer_id: dataDetail.peer_id
      };
      yield put(actions.detailReportSuccess(information));
    }
  } catch (error) {
    yield put(actions.requestFailure(error));
  }
}


function* detailLinkReportedSaga({payload} ) {
    try {
        console.log("payload",payload)
      const res = yield getListLinkOfAccount(payload);
      if (res.code == 0) {
        yield put(actions.requestFailure(res.message));
      } else {
        const dataDetail = res.response;
        
        yield put(actions.detailLinkReportedSuccess(dataDetail));
      }
    } catch (error) {
      yield put(actions.requestFailure(error));
    }
  }

  function* detailAccountReportedSaga({ payload }) {
    try {
      const res = yield getListAccountPhoneOfAccount(payload);
      if (res.code == 0) {
        yield put(actions.requestFailure(res.message));
      } else {
        const dataDetail = res.response;
        yield put(actions.detailAccountReportedSuccess(dataDetail));
      }
    } catch (error) {
      yield put(actions.requestFailure(error));
    }
  }
const reportSaga = [
  takeEvery(actions.listReportRequest.type, listReportSaga),
  takeEvery(actions.detailReportRequest.type, detailReportSaga),
  takeEvery(actions.detailAccountReportedRequest.type,detailAccountReportedSaga),
  takeEvery(actions.detailLinkReportedRequest.type,detailLinkReportedSaga)
];
export default reportSaga;
