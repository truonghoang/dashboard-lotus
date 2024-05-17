import { all } from 'redux-saga/effects';
import User from './User';
import Report from "./Report"
export default function* rootSaga() {
  yield all([
    ...User,
    ...Report
  ]);
}
