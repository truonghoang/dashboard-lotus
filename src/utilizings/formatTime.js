import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');
export const formatBirthday = (timestamp, novalue = '') => (timestamp > 0 ? moment(timestamp).utcOffset(7).format('DD/MM/YYYY') : novalue);
export const formatLongDate = (timestamp) => moment(timestamp).utcOffset(7).format('dddd, DD/MM/YYYY');
export const formatShortDate = (timestamp) => moment(timestamp).utcOffset(7).format('DD/MM/YYYY');

export const formatInputDate = (timestamp) => moment(timestamp).utcOffset(7).format('YYYY-MM-DD');
export const formatTime = (timestamp) => moment(timestamp).utcOffset(7).format('HH:mm');
export const formatGroupKey = (timestamp) => moment(timestamp).utcOffset(7).format('YYYYMMDD');
export const formatTimeDate = (timestamp) => moment(timestamp).utcOffset(7).format('HH:mm, DD-MM-YYYY');
export const formatDateTime = (timestamp) => moment(timestamp).utcOffset(7).format('DD/MM/YYYY HH:mm');
export const formatDateTime3 = (timestamp) => moment(timestamp).utcOffset(7).format('YYYY/MM/DD');

export const formatTimeDate1 = (timestamp) => moment(timestamp).utcOffset(7).format('YYYYMMDDHHmmss');
export const formatRelativeLongDate = (timestamp) => {
  return moment(timestamp).utcOffset(7).calendar(null, {
    sameDay: '[Hôm nay,] DD/MM/YYYY  ',
    nextDay: '[Ngày mai,] DD/MM/YYYY ',
    nextWeek: 'dddd, DD/MM/YYYY',
    lastDay: '[Hôm qua,] DD/MM/YYYY ',
    lastWeek: 'dddd, DD/MM/YYYY',
    sameElse: 'dddd, DD/MM/YYYY'
  });
};
