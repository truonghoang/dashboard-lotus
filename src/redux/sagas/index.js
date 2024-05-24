import { all } from 'redux-saga/effects';
import User from './User';
import Report from "./Report"
import Reporter from "./Reporter"
export default function* rootSaga() {
  yield all([
    ...User,
    ...Report,
    ...Reporter
  ]);
}
