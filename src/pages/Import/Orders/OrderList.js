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
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './OrderList.less';
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
  const { modalVisible, form, handleAdd, handleModalVisible, customer=[] } = props;
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
      title="Tạo Đơn hàng mới"
      visible={modalVisible}
      onOk={okHandle}
      width={640}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Thông Tin Khách Hàng">
          {form.getFieldDecorator('customer_id', {
            rules: [{ required: true, message: 'Thông tin khách hàng'}],
          })(<Select style={{ width: 220 }}>
          {customer.data && customer.data.map((data)=>{
            return <Option value={data.id}>{data.name + " - "+ data.phone}</Option>
          })}
          
         
        </Select>)}
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Mã Đơn Hàng">
        {form.getFieldDecorator('order_code', {
          rules: [{ required: true, message: 'Mã Đơn Hàng ' }],
        })(<Input placeholder="" />)}
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Người Đặt Hàng">
        {form.getFieldDecorator('order_name', {
          rules: [{ required: true, message: 'Người Đặt Hàng' }],
          initialValue:"MS.HỒNG - 0888651775"
        })(<Select
          showSearch
          style={{ width: 400 }}
          placeholder="Người Đặt Hàng"
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="MS.HỒNG - 0888651775">MS.HỒNG - 0888651775</Option>
        </Select>)}
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Địa chỉ giao hàng">
        {form.getFieldDecorator('delivery_address', {
          rules: [{ required: true, message: 'địa chỉ giao hàng' }],
          initialValue:"416A1 Hai Bà Trưng, Tân Định, Quận 1, HCM"
        })( <Select
          showSearch
          style={{ width: 400 }}
          placeholder="Chọn Địa chỉ"
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="416A1 Hai Bà Trưng, Tân Định, Quận 1, HCM">416A1 Hai Bà Trưng, Tân Định, Quận 1, HCM</Option>
        </Select>)}
      </FormItem>

      
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Thời gian Giao Hàng">
        {form.getFieldDecorator('delivery_time', {
          rules: [{ required: true, message: 'thời gian giao hàng ' }],
        })(<DatePicker
          showTime
          format="MM-DD HH:mm"
        />)}
      </FormItem>



      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Sale Force">
        {form.getFieldDecorator('sale_force', {
          initialValue:"HONG NHANH - 090 705 6593"
        })( <Select
          showSearch
          style={{ width: 400 }}
          placeholder="Chọn Địa chỉ"
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="HONG NHANH - 090 705 6593">HONG NHANH - 090 705 6593</Option>
        </Select>)}
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Hotline Deli">
        {form.getFieldDecorator('hotline_deli', {
          initialValue:"0932.032.719"
        })( <Select
          showSearch
          style={{ width: 400 }}
          placeholder="Chọn Địa chỉ"
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="0932.032.719">0932.032.719</Option>
        </Select>)}
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Email">
        {form.getFieldDecorator('email', {
          initialValue:"mccvn.delivery.st10@mmvietnam.com"
        })( <Select
          showSearch
          style={{ width: 400 }}
          placeholder="Chọn Địa chỉ"
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="mccvn.delivery.st10@mmvietnam.com">mccvn.delivery.st10@mmvietnam.com</Option>
        </Select>)}
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="CC Email">
        {form.getFieldDecorator('cc_email', {
          initialValue:"mccvn.kas.st10@mmvietnam.com"
        })( <Select
          mode="multiple"
          size="large"
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          
          style={{ width: '100%' }}
        >
          <Option value="mccvn.kas.st10@mmvietnam.com">mccvn.kas.st10@mmvietnam.com</Option>
          <Option value="nhanhnguyen158@gmail.com">nhanhnguyen158@gmail.com</Option>
          	
        </Select>)}
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Ghi Chú">
        {form.getFieldDecorator('note', {
          rules: [{ required: false, message: 'note ' }],
        })(<TextArea cols={4} placeholder="" />)}
      </FormItem>
    </Modal>
  );
});

@Form.create()
class UpdateForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        name: props.values.name,
        desc: props.values.desc,
        key: props.values.key,
        target: '0',
        template: '0',
        type: '1',
        time: '',
        frequency: 'month',
      },
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  handleNext = currentStep => {
    const { form, handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep < 2) {
            this.forward();
          } else {
            handleUpdate(formVals);
          }
        }
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  renderContent = (currentStep, formVals) => {
    const { form } = this.props;
    if (currentStep === 1) {
      return [
        <FormItem key="target" {...this.formLayout} label="监控对象">
          {form.getFieldDecorator('target', {
            initialValue: formVals.target,
          })(
            <Select style={{ width: '100%' }}>
              <Option value="0">表一</Option>
              <Option value="1">表二</Option>
            </Select>
          )}
        </FormItem>,
        <FormItem key="template" {...this.formLayout} label="规则模板">
          {form.getFieldDecorator('template', {
            initialValue: formVals.template,
          })(
            <Select style={{ width: '100%' }}>
              <Option value="0">规则模板一</Option>
              <Option value="1">规则模板二</Option>
            </Select>
          )}
        </FormItem>,
        <FormItem key="type" {...this.formLayout} label="规则类型">
          {form.getFieldDecorator('type', {
            initialValue: formVals.type,
          })(
            <RadioGroup>
              <Radio value="0">强</Radio>
              <Radio value="1">弱</Radio>
            </RadioGroup>
          )}
        </FormItem>,
      ];
    }
    if (currentStep === 2) {
      return [
        <FormItem key="time" {...this.formLayout} label="开始时间">
          {form.getFieldDecorator('time', {
            rules: [{ required: true, message: '请选择开始时间！' }],
          })(
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="选择开始时间"
            />
          )}
        </FormItem>,
        <FormItem key="frequency" {...this.formLayout} label="调度周期">
          {form.getFieldDecorator('frequency', {
            initialValue: formVals.frequency,
          })(
            <Select style={{ width: '100%' }}>
              <Option value="month">月</Option>
              <Option value="week">周</Option>
            </Select>
          )}
        </FormItem>,
      ];
    }
    return [
      <FormItem key="name" {...this.formLayout} label="Name">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: 'Please enter your name' }],
          initialValue: formVals.name,
        })(<Input placeholder="Name" />)}
      </FormItem>,
      <FormItem key="desc" {...this.formLayout} label="Description">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: 'Description', min: 5 }],
          initialValue: formVals.desc,
        })(<TextArea rows={4} placeholder="Description" />)}
      </FormItem>,
    ];
  };

  renderFooter = currentStep => {
    const { handleUpdateModalVisible, values } = this.props;
    if (currentStep === 1) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
          下一步
        </Button>,
      ];
    }
    if (currentStep === 2) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          完成
        </Button>,
      ];
    }
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        下一步
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="规则配置"
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="基本信息" />
          <Step title="配置规则属性" />
          <Step title="设定调度周期" />
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({ importOrder,customer, loading }) => ({
  order: importOrder,
  customer: customer,
  loading: loading.models.importOrder,
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
      title: 'Mã Đơn hàng',
      dataIndex: 'order_code',
      render: (text, order) => <a onClick={() => this.previewItem(order.id)}>{text}</a>,
    },
    {
      title: 'Tên Khách Hàng',
      dataIndex: 'customer',
      
    },

    {
      title: 'Địa chỉ',
      dataIndex: 'delivery_address',
      sorter: true,
      // needTotal: true,
    },
    {
      title: 'Thời gian giao hàng',
      dataIndex: 'delivery_time',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,

      // needTotal: true,
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
          <a onClick={this.handleMenuClick.bind(this,record)}>Delete</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'importOrder/fetch',
    });
    dispatch({
      type: 'customer/fetch',
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
      type: 'importOrder/fetch',
      payload: params,
    });
  };

  previewItem = id => {
    router.push(`orders/${id}`);
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'importOrder/fetch',
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
    console.log(selectedRows.map(row => row.id))
    dispatch({
      type: 'importOrder/remove',
      payload: {
        id: e & e.id ? e.id : selectedRows.map(row => row.id),
      },
      callback: () => {
        message.success("Xoá Đơn Hàng Thành Công");
        this.componentDidMount()
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
        type: 'importOrder/fetch',
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

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'importOrder/add',
      payload: {
        ...fields,
      },
      callback : ()=>{
        message.success('Thêm Đơn Hàng Thành Công');
        this.componentDidMount();
        
      }
    });

    
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'importOrder/update',
      payload: {
        query: formValues,
        body: {
          name: fields.name,
          desc: fields.desc,
          key: fields.key,
        },
      },
    });

    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Name">
              {getFieldDecorator('name')(<Input placeholder="Name" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Status">
              {getFieldDecorator('status')(
                <Select placeholder="" style={{ width: '100%' }}>
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                Reset
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                More <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Name">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Status">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status4')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      order: { data },
      loading,
      
    } = this.props;
    const {customer = {}} = this.props
    if (loading || data == undefined || data.length == 0) {
      return [];
    }
    
    let orderData = data.data || []
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
      <PageHeaderWrapper title="Products">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                Tạo Đơn Hàng Mới
              </Button>
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
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={orderData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} customer={customer.data} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default Orders;
