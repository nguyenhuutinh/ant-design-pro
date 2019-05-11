import { queryImportProduct, removeImportProduct, addImportProduct, updateImportProduct } from '@/services/api';

export default {
  namespace: 'importProduct',

  state: {
    // data: {
    //   list: [],
    //   pagination: {},
    // },
    data: undefined
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryImportProduct, payload);
      yield put({
        type: 'load',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      // console.log(addImportProduct)
      const response = yield call(addImportProduct, payload);
      yield put({
        type: 'addProduct',
        payload: response,
      });
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeImportProduct, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateImportProduct, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    
    
  },

  reducers: {
    load(state, action) {
      return {
        ...state,
        data: action.payload,
        isAdded: false
      };
    },
    addProduct(state, action) {
      return {
        ...state,
        // data: action.payload,
        isAdded: true
        
      };
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload,
        isAdded: true
      };
    },
  },
};
