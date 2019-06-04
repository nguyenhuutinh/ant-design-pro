import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

// My API

export async function postLogin(params) {
  return request('/api/v1/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function queryImportProduct(params) {
  return request(`/api/v1/import/products?${stringify(params)}`);
}
export async function removeImportProduct(params) {
  return request('/api/v1/import/products', {
    method: 'DELETE',
    data: {
      ...params
    },
  });
}

export async function addImportProduct(params) {
  return request('/api/v1/import/products', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateImportProduct(params = {}) {
  return request(`/api/v1/import/product?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}


export async function querySupplier(params) {
  return request(`/api/v1/supplier?${stringify(params)}`);
}

export async function addSupplier(params) {
  return request('/api/v1/supplier', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeSupplier(params) {
  return request('/api/v1/supplier', {
    method: 'DELETE',
    data: {
      ...params
    },
  });
}
export async function querySupplierDetail(params) {
  return request(`/api/v1/sale/supplier/${params}`);
}


export async function updateSupplier(params = {}) {
  return request(`/api/v1/import/supplier?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body
    },
  });
}

export async function querySaleProduct(params) {
  return request(`/api/v1/sale/products?${stringify(params)}`);
}

export async function removeSaleProduct(params) {
  return request('/api/v1/sale/product', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addSaleProduct(params) {
  return request('/api/v1/sale/product', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateSaleProduct(params = {}) {
  return request(`/api/v1/sale/product?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function querySaleOrders(params) {
  return request(`/api/v1/sale/orders?${stringify(params)}`);
}

export async function removeSaleOrder(params) {
  return request('/api/v1/sale/orders', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addSaleOrder(params) {
  return request('/api/v1/sale/orders', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateSaleOrder(params = {}) {
  return request(`/api/v1/sale/orders?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function querySaleOrderDetail(params) {
  return request(`/api/v1/sale/orders/${params}`);
}

export async function queryImportOrders(params) {
  return request(`/api/v1/import/orders?${stringify(params)}`);
}

export async function removeImportOrder(params) {
  return request('/api/v1/import/orders', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addImportOrder(params) {
  return request('/api/v1/import/orders', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function updateImportOrderProducts(params = {}) {
  return request(`/api/v1/import/orders/${params.id}/products`, {
    method: 'PUT',
    data: {
      ...params,
    },
    
  });
}


export async function updateImportOrderProducts2(params = {}) {
  return request(`/api/v1/import/orders/${params.id}/orderproducts`, {
    method: 'PUT',
    data: {
      ...params,
    },
    
  });
}



export async function uploadFile(params = {}) {
  // console.log("params",params)
  return request(`/api/v1/upload/file`, {
    method: 'POST',
    data: params.data,
    
  }
  ,"file");
}

export async function updateImportOrder(params = {}) {
  
  return request(`/api/v1/import/orders?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function queryImportOrderDetail(params) {
  return request(`/api/v1/import/orders/${params}`);
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}
