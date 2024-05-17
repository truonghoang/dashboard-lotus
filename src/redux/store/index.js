import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import logger from 'redux-logger';
const sagaMiddleware = createSagaMiddleware();
const store =
  process.env.NODE_ENV == 'production'
    ? configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: false
          }).concat(sagaMiddleware)
      })
    : configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: false
          }).concat(sagaMiddleware, logger)
      });
sagaMiddleware.run(rootSaga);

export default store;
