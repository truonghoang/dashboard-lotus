import { put, takeEvery ,takeLatest} from 'redux-saga/effects';
import Swal from 'sweetalert2';
import {listReport,detailReport} from "@/apis/report"
import * as actions from '../reducers/Report';

function* listReportSaga({ payload }) {
  
    try {
        const res = yield listReport(payload)
        if (res.status ==0){
            yield put(actions.requestFailure(res.message))
        }
        else{
            yield put(actions.listReportSuccess({
                data:res.response.data,
                limit:res.response.limit,
                page: res.response.page,
                totalPage: res.response.totalPage
            }))
        }
    } catch (error) {
        yield put(actions.requestFailure(error))
    }

   
 
 
}

function* detailReportSaga ({payload}){
try {
    const res = yield detailReport(payload)
    if(res.code == 0){
        yield put(actions.requestFailure(res.message))
    }else{
        const dataDetail = res.response
        const information = {
            Name_Reporter : `${dataDetail.lastname_rpter} ${dataDetail.firstname_rpter}`,
               Phone_Reporter: dataDetail.phone_rpter,
               Email_Reporter:dataDetail.email_rpter,
               Name_Reported : `${dataDetail.lastname_rpted} ${dataDetail.firstname_rpted}`,
               Email_Reported:dataDetail.email_rpted,
               Phone_Reported: dataDetail.phone_rpted,
               Reason: dataDetail.reason,
               Message: dataDetail.message,
               Time_Report:dataDetail.created_at
            }
        yield put(actions.detailReportSuccess(information))
    }
} catch (error) {
    yield put(actions.requestFailure(error))
}
}


const reportSaga = [
  takeEvery(actions.listReportRequest.type, listReportSaga),
  takeLatest(actions.detailReportRequest.type,detailReportSaga)
  
];
export default reportSaga;
