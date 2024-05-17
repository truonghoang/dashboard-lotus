import { put, takeEvery ,takeLatest} from 'redux-saga/effects';
import Swal from 'sweetalert2';
import {login,listUser,detailUser,searchUser,selectUser} from "@/apis/user"
import * as actions from '../reducers/User';

function* loginSaga({ payload }) {
  
  let {email,password} = payload
  
  email = email.trim()
  password =password.trim()
  const res = yield login({email,password})
  if(res.code==0){
    yield Swal.fire({
      title: res.message,
      icon:"error"
    })
    yield put(actions.requestUserFailure(res.message))
  }else{
    yield put(actions.loginSuccess({
      token: res.response.token,
      email:res.response.email
    }))
  }
 
}
function* logoutSaga() {
 
}

function* listUserSaga({payload}){
  try {
    try {
      const res = yield listUser(payload)
      if (res.status ==0){
          yield put(actions.requestFailure(res.message))
      }
      else{
          yield put(actions.listUserSuccess({
              data:res.response.data,
              limit:res.response.limit,
              page: res.response.page,
              totalPage: res.response.totalPage
          }))
      }
  } catch (error) {
      yield put(actions.requestFailure(error))
  }

    
  } catch (error) {
    
  }
}

const userSaga = [
  takeEvery(actions.loginRequest.type, loginSaga),
  takeLatest(actions.logoutRequest.type, logoutSaga),
  takeLatest(actions.listUserRequest.type,listUserSaga)
];
export default userSaga;
