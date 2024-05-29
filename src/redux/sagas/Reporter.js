import { put, takeEvery, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import {
  getReportByReporter,
  filterReportOfReporterByReason,
  getListReportOfReportedUser,
  filterByReasonReportedUser,
} from "../../apis/report";
import * as actions from "../reducers/Reporter";

function* listReportSaga({ payload }) {
  try {
    const res = yield getReportByReporter(payload);
    if (res.status == 0) {
      yield put(actions.requestFailure(res.message));
    } else {
      yield put(
        actions.listReportOfReporterSuccess(
          {data: res.response }
        )
      );
    }
  } catch (error) {
    yield put(actions.requestFailure(error));
  }
}

function* filterByReasonSaga({ payload }) {
  try {
    const res = yield filterReportOfReporterByReason(payload);
    if (res.status == 0) {
      yield put(actions.requestFailure(res.message));
    } else {
      yield put(
        actions.filterByReasonSuccess({
          data: res.response,
        
        })
      );
    }
  } catch (error) {
    yield put(actions.requestFailure(error));
  }0
}

const reportSaga = [
  takeLatest(actions.listReportOfReporterRequest.type, listReportSaga),
  takeLatest(actions.filterByReasonRequest.type, filterByReasonSaga),
 
];
export default reportSaga;
