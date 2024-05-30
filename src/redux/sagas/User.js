import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import Swal from 'sweetalert2';
import { login, listUserBan,banUser,searchUserBanned} from "@/apis/user"
import {getListReportByPeerId,filterByReasonReportedUser,getHistoryByPeerId} from "../../apis/report"
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
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 55);
    yield Cookies.set("account",res.response.email,{expires:expirationDate})
    yield Cookies.set("user",res.response.token,{expires:expirationDate})
    yield put(actions.loginSuccess({
      token: res.response.token,
      email: res.response.email
    }))
    yield window.location.href ="/"
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

function* filterReportUserSaga({ payload }) {

  try {
    const res = yield filterByReasonReportedUser(payload)
    if (res.status == 0) {
      yield put(actions.requestFailure(res.message))
    }
    else {
      yield put(actions.filterReportSuccess({
        data: res.response
       
      }))
    }
  } catch (error) {
    yield put(actions.requestFailure(error))
  }



}

function* getHistoryUserBanSaga({payload}){
  try {
    const res = yield getHistoryByPeerId(payload)

    if (res.code == 0){
      yield put(actions.requestFailure(res.message))
    }else{
      yield put(actions.historyUserBannedSuccess(res.response))
    }
  } catch (error) {
    yield put(actions.requestFailure(error))
  }
}

function* banUserSaga({payload}){
  try {
    const {page,limit} = yield select(state=>state.UserReducer)
    const res = yield banUser(payload)
    if(res.code==0){
      yield put(actions.requestFailure(res.message))
      yield Swal.fire({text: "lệnh sảy ra lỗi trong quá trình xử lí",icon:"error"})
    }else{
      yield put(actions.unBanUserSuccess(res.message))
      yield Swal.fire({text: "lệnh đã được thực thi thành công",icon:"success"})
      yield put(actions.listUserBanRequest({page,limit,orderBy:"DESC",ban:1}))
    }
  } catch (error) {
    yield put(actions.requestFailure(error))
  }
}

function* searchUserBannedSaga({payload}){
  try {
    const res = yield searchUserBanned(payload)
    if (res.code ==0){
      yield put(actions.requestFailure(res.message))
    }else{
      yield put(actions.searchUserBannedSuccess({
        data: res.response.data,
        page:res.response.page,
        limit:res.response.limit,
        totalPage:res.response.totalPage,
        keySearch: payload.keySearch
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
  takeLatest(actions.listUserBanRequest.type,listUserBanSaga),
  takeLatest(actions.filterReportRequest.type,filterReportUserSaga),
  takeLatest(actions.historyUserBannedRequest.type,getHistoryUserBanSaga),
  takeLatest(actions.unBanUserRequest.type,banUserSaga),
  takeLatest(actions.searchUserBannedRequest.type,searchUserBannedSaga)
];
export default userSaga;
