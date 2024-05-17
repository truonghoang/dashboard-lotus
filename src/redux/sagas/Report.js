import { put, select, takeEvery ,takeLatest} from 'redux-saga/effects';
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

}


const reportSaga = [
  takeEvery(actions.listReportRequest.type, listReportSaga),
  takeLatest(actions.detailReportRequest.type,detailReportSaga)
  
];
export default reportSaga;
