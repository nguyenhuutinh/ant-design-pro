import { uploadFile, queryImportOrders, queryImportOrderDetail, addImportOrder, removeImportOrder, updateImportOrder , updateImportOrderProducts} from '@/services/api';

export default {
  namespace: 'importOrder',

  state: {
    // data: {
    //   list: [],
    //   pagination: {},
    // },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryImportOrders, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addImportOrder, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeImportOrder, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateImportOrder, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *detail({ payload }, { call, put }) {
      const response = yield call(queryImportOrderDetail, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *updateProducts({ payload, callback }, { call, put }) {
      const response = yield call(updateImportOrderProducts, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *upload({ payload, callback }, { call, put }) {
      // console.log(payload, "payload")
      const response = yield call(uploadFile, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
