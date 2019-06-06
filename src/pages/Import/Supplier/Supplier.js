import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Upload
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Supplier.less';
import SupplierTableForm from '@/pages/Forms/SupplierTableForm';
const Dragger = Upload.Dragger;

const debug = console.log;
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, customer = [] } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="Nhập Thông tin nhà CC mới"
      visible={modalVisible}
      onOk={okHandle}
      width={640}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Tên Nhà Cung cấp">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: 'Tên Nhà Cung cấp' }],
        })(
         <Input />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Số Điện Thoại">
        {form.getFieldDecorator('phone', {
          rules: [{ required: true, message: 'SDT ' }],
        })(<Input placeholder="" />)}
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Địa Chỉ">
        {form.getFieldDecorator('address', {
          rules: [{ required: true, message: 'Địa Chỉ' }],
          
        })(<Input placeholder="" />)}
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Mã Số Thuế">
        {form.getFieldDecorator('ma_so_thue', {
          rules: [{ required: false, message: 'Mã Số Thuế' }],
          
        })(<Input placeholder="" />)}
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Type">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: 'type' }],
          initialValue: 'supplier',
        })(
          <Select
            showSearch
            style={{ width: 400 }}
            placeholder="type"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="supplier">SUPPLIER</Option>
            <Option value="store">STORE</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="email">
        {form.getFieldDecorator('email', {
          rules: [{ required: false, message: 'email' }, {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },],
          
        })(<Input placeholder="" />)}
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Sale Force">
        {form.getFieldDecorator('sale_force', {
          rules: [{ required: false, message: 'sale force' }],
          
        })(<Input placeholder="" />)}
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="hotline deli">
        {form.getFieldDecorator('hotline_deli', {
          rules: [{ required: false, message: 'hotline_deli' }],
          
        })(<Input placeholder="" />)}
      </FormItem>
      
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="cc email">
        {form.getFieldDecorator('cc_email', {
          rules: [{ required: false, message: 'cc_email' }],
          
        })(<Input placeholder="" />)}
      </FormItem>
      
    </Modal>
  );
});


/* eslint react/no-multi-comp:0 */

@connect(({ supplier, customer, loading }) => ({
  supplier,
  customer: customer,
  loading: loading.models.supplier,
}))
@Form.create()
class Orders extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  columns = [
    {
      title: 'Tên',
      dataIndex: 'name'
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'phone',
    },

    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      sorter: true,
      // needTotal: true,
    },
    {
      title: 'Mã Số Thuế',
      dataIndex: 'ma_so_thue',
      sorter: true,
      // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,

      // needTotal: true,
    },
    {
      title: 'sale_force',
      dataIndex: 'sale_force',
      // sorter: true,
      // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,

      // needTotal: true,
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'cc email',
      dataIndex: 'cc_email',
      render: val => <div style={{width: '200px',  wordWrap: 'break-word'}}>{val}</div>,
    },

    {
      title: 'Ghi Chú',
      dataIndex: 'note',
    },
   
    {
      title: 'Cập Nhật lúc',
      dataIndex: 'updatedAt',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'Action',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>Edit</a>
          <Divider type="vertical" />
          <a onClick={this.handleMenuClick.bind(this, record)}>Delete</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'supplier/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'supplier/fetch',
      payload: params,
    });
  };

  previewItem = id => {
    router.push(`supplier/${id}`);
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'supplier/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    console.log(selectedRows.map(row => row.id));
    dispatch({
      type: 'supplier/remove',
      payload: {
        id: e & e.id ? e.id : selectedRows.map(row => row.id),
      },
      callback: () => {
        message.success('Xoá Đơn Hàng Thành Công');
        this.componentDidMount();
        this.setState({
          selectedRows: [],
        });
      },
    });
    // if (selectedRows.length === 0) return;
    // switch (e.key) {
    //   case 'remove':
    //     dispatch({
    //       type: 'importOrder/remove',
    //       payload: {
    //         key: selectedRows.map(row => row.key),
    //       },
    //       callback: () => {
    //         this.setState({
    //           selectedRows: [],
    //         });
    //       },
    //     });
    //     break;
    //   default:
    //     break;
    // }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'supplier/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };
  onUpdateSupplier = (e) =>{
    var data = {suppliers: e}
    const { dispatch } = this.props;
    dispatch({
      type: 'supplier/update',
      payload: data,
      callback: () => {
        message.success('Update Đơn Hàng Thành Công');
        this.componentDidMount();
        this.handleModalVisible();
      },
    });
  }
  handleAdd = fields => {
    console.log(fields)
    const { dispatch } = this.props;
    dispatch({
      type: 'supplier/add',
      payload: {
        ...fields,
      },
      callback: () => {
        message.success('Thêm Đơn Hàng Thành Công');
        this.componentDidMount();
        this.handleModalVisible();
      },
    });
  };


  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {
      supplier: { data },
      loading,
    } = this.props;
    const { customer = {} } = this.props;
    if (data == undefined || data.length == 0) {
      return [];
    }

    let orderData = data.data || [];
    // console.log('ok', this.props);
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper title="Nhà Cung Cấp">
        <Card bordered={false}>
          <div className={styles.tableList}>
            {/* <div className={styles.tableListForm}>{this.renderForm()}</div> */}
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                Thêm Nhà Cung Cấp Mới
              </Button>
              {/* <Button
                icon="plus"
                type="primary"
                onClick={() => this.handleUpdateModalVisible(true)}
              >
                Import
              </Button> */}
              {selectedRows.length > 0 && (
                <span>
                  <Button>Select All</Button>
                  <Button onClick={this.handleMenuClick}>Delete</Button>
                  {/* <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown> */}
                </span>
              )}
            </div>
            {getFieldDecorator('members', {
              initialValue: orderData,
            })(<SupplierTableForm onUpdateSupplier={this.onUpdateSupplier} />)}
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} customer={customer.data} />
        {/* {stepFormValues ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null} */}
      </PageHeaderWrapper>
    );
  }
}

export default Orders;
