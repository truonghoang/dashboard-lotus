import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import Swal from 'sweetalert2';
import { login, listUserBan} from "@/apis/user"
import {getListReportByPeerId} from "../../apis/report"
import * as actions from '../reducers/User';
import Cookies from 'js-cookie';
function* loginSaga({ payload }) {

  let { email, password } = payload

  email = email.trim()
  password = password.trim()
  const res = yield login({ email, password })
  if (res.code == 0) {
    yield Swal.fire({
      title: res.message,
      icon: "error"
    })
    yield put(actions.requestFailure(res.message))
  } else {
    yield Cookies.set("account",res.response.email)
    yield put(actions.loginSuccess({
      token: res.response.token,
      email: res.response.email
    }))
  }

}
function* logoutSaga() {

}

function* listUserSaga({ payload }) {

  try {
    const res = yield getListReportByPeerId(payload)
    if (res.status == 0) {
      yield put(actions.requestFailure(res.message))
    }
    else {
      yield put(actions.listReportUserSuccess({
        data: res.response
      }))
    }
  } catch (error) {
    yield put(actions.requestFailure(error))
  }



}

function* listUserBanSaga({ payload }) {

  try {
    const res = yield listUserBan(payload)
    if (res.status == 0) {
      yield put(actions.requestFailure(res.message))
    }
    else {
      yield put(actions.listReportUserSuccess({
        data: res.response.data,
        limit: res.response.limit,
        page: res.response.page,
        totalPage: res.response.totalPage,
      }))
    }
  } catch (error) {
    yield put(actions.requestFailure(error))
  }



}


const userSaga = [
  takeEvery(actions.loginRequest.type, loginSaga),
  takeLatest(actions.logoutRequest.type, logoutSaga),
  takeLatest(actions.listReportUserRequest.type, listUserSaga),
  takeLatest(actions.listUserBanRequest.type,listUserBanSaga)
];
export default userSaga;
