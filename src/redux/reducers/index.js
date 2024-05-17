import { combineReducers } from 'redux';

import User from './User';
import Report from "./Report"

export default combineReducers({
  UserReducer: User,
  ReportReducer: Report
});
