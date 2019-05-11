/**
 * request 网络请求工具
 * 更详细的api文档: https://bigfish.alipay.com/doc/api#request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import router from 'umi/router';
import hash from 'hash.js';
import { isAntdPro } from './utils';
import token from './token';

const codeMessage = {
  200: 'Máy chủ trả về thành công dữ liệu được yêu cầu.',
  201: 'Dữ liệu mới hoặc sửa đổi là thành công.',
  202: 'Một yêu cầu đã nhập vào hàng đợi nền (tác vụ không đồng bộ).',
  204: 'Dữ liệu đã bị xóa thành công.',
  400: 'Yêu cầu được thực hiện với một lỗi và máy chủ không thực hiện bất kỳ hoạt động nào để tạo hoặc sửa đổi dữ liệu.',
  401: 'Người dùng không có quyền',
  403: 'Người dùng được ủy quyền, nhưng truy cập bị cấm. ',
  404: 'Yêu cầu được gửi là cho một bản ghi không tồn tại và máy chủ không hoạt động. ',
  406: 'Định dạng của yêu cầu không có sẵn. ',
  410: 'Tài nguyên được yêu cầu sẽ bị xóa vĩnh viễn và sẽ không được lấy lại. ',
  422: 'Khi tạo một đối tượng, đã xảy ra lỗi xác thực. ',
  500: 'Máy chủ có lỗi. Vui lòng kiểm tra máy chủ. ',
  502: 'Lỗi cổng. ',
  503: 'Dịch vụ không khả dụng, máy chủ tạm thời bị quá tải hoặc bảo trì. ',
  504: 'Cổng đã hết thời gian. ',
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;

  if (status === 401) {
    notification.error({
      message: 'Chưa đăng nhập hoặc đăng nhập đã hết hạn, vui lòng đăng nhập lại',
    });
    // @HACK
    /* eslint-disable no-underscore-dangle */
    window.g_app._store.dispatch({
      type: 'login/logout',
    });
    return;
  }
  notification.error({
    message: `Lỗi ${status}: ${url}`,
    description: errortext,
  });
  // environment should not be used
  if (status === 403) {
    router.push('/exception/403');
    return;
  }
  // if (status <= 504 && status >= 500) {
  //   router.push('/exception/500');
  //   return;
  // }
  // if (status >= 404 && status < 422) {
  //   router.push('/exception/404');
  // }
};

/**
 * 配置request请求时的默认参数
 */
const r = extend({
  errorHandler, // 默认错误处理
  credentials: 'include',
});

const request = (e, e1) => {
  var options = e1;
  if (options == undefined) {
    options = {};
  }
  if (token.get()) {
    options.headers = { Authorization: `Bearer ${token.get()}` };
  }
  return r(e, options);
};
export default request;
