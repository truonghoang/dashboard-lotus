import { combineReducers } from 'redux';

import User from './User';
import Report from "./Report"
import Reporter from "./Reporter"
export default combineReducers({
  UserReducer: User,
  ReportReducer: Report,
  ReporterReducer:Reporter
});
