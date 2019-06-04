import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Form , Modal, Button, message} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './OrderDetail.less';
import moment from 'moment';
import StandardTable from '@/components/StandardTable';
const { Description } = DescriptionList;

const debug = console.log

@connect(({ importOrder,importProduct, loading }) => ({
  order: importOrder,
  loading: loading.global,
  products: importProduct,
}))
class OrderDetail extends Component {
  state = {}
  componentDidMount() {
    debug("componentDidMount")
    const { dispatch, match } = this.props;
    const { params } = match;

    dispatch({
      type: 'importOrder/detail',
      payload:params.id ,
    });

    dispatch({
      type: 'importProduct/fetch',
      payload: {},
    });
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

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
      type: 'importProduct/fetch',
      payload: params,
    });
  };
  onAddProducts = (e) =>{
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    console.log(this.props)
    dispatch({
      type: 'importOrder/updateProducts',
      payload: {
        id: this.props.order.data.id,
        productIDs: e & e.id ? e.id : selectedRows.map(row => row.id),
      },
      callback: (res)=>{
        debug("res",res)
        if(res){
          this.componentDidMount()
          this.handleModalVisible()
          message.success("Update Sản Phẩm Thành Công");
        }
      },
    });    
  }

  render() {
    const { order = {}, loading, products ={} } = this.props;
    const {data: productList = []} = products.data || {}
    const {modalVisible, selectedRows=[]} = this.state;
    const { productIDs = [], customer = {} } = order.data || {};
    console.log("productIDs",productIDs)
    const orderDetail = order.data || {}
    // let goodsData = [];
    // if (basicGoods.length) {
    //   let num = 0;
    //   let amount = 0;
    //   basicGoods.forEach(item => {
    //     num += Number(item.num);
    //     amount += Number(item.amount);
    //   });
    //   goodsData = basicGoods.concat({
    //     id: '总计',
    //     num,
    //     amount,
    //   });
    // }
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      // if (index === basicGoods.length) {
      //   obj.props.colSpan = 0;
      // }
      return obj;
    };

    const productColumns = [
      {
        title: 'Product Code',
        dataIndex: 'prd_code',
        key: 'prd_code',
        // render: (text, row, index) => {
          // if (index < basicGoods.length) {
          //   return <a href="">{text}</a>;
          // }
          // return {
          //   children: <span style={{ fontWeight: 600 }}>总计</span>,
          //   props: {
          //     colSpan: 4,
          //   },
          // };
        // },
      },
      {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
        // render: renderContent,
      },
      
      {
        title: 'Đơn Vị Tính',
        dataIndex: 'dvt',
        key: 'dvt',
        align: 'right',
        render: renderContent,
      },
      {
        title: 'Lưu Ý',
        dataIndex: 'note',
        key: 'note',
        align: 'right',
        render: (text, row, index) => {
          // if (index < basicGoods.length) {
          //   return text;
          // }
          return <span style={{ color: 'red' }}>{text}</span>;
        },
      },
      {
        title: 'Số Lượng',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right',
        render: (text, row, index) => {
          // if (index < basicGoods.length) {
          //   return text;
          // }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
    ];

    const productListColumns = [
      {
        title: 'Product Code',
        dataIndex: 'product_id.prd_code',
        key: 'prd_code',
        // render: (text, row, index) => {
          // if (index < basicGoods.length) {
          //   return <a href="">{text}</a>;
          // }
          // return {
          //   children: <span style={{ fontWeight: 600 }}>总计</span>,
          //   props: {
          //     colSpan: 4,
          //   },
          // };
        // },
      },
      {
        title: 'Product Name',
        dataIndex: 'product_id.name',
        key: 'name',
        // render: renderContent,
      },
      
      {
        title: 'Đơn Vị Tính',
        dataIndex: 'product_id.dvt',
        key: 'dvt',
        align: 'right',
        render: renderContent,
      },
      {
        title: 'Lưu Ý',
        dataIndex: 'note',
        key: 'note',
        align: 'right',
        render: (text, row, index) => {
          // if (index < basicGoods.length) {
          //   return text;
          // }
          return <span style={{ color: 'red' }}>{text}</span>;
        },
      },
      {
        title: 'Số Lượng',
        dataIndex: 'quantity',
        key: 'amount',
        align: 'right',
        render: (text, row, index) => {
          // if (index < basicGoods.length) {
          //   return text;
          // }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
    ];
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleSelectRows: this.handleSelectRows,
      handleModalVisible: this.handleModalVisible,
      handleStandardTableChange: this.handleStandardTableChange
    };
    return (
      <div>
        
      <PageHeaderWrapper title="CHI TIẾT ĐƠN HÀNG" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="Thông tin Khách Hàng" style={{ marginBottom: 32 }}>
            {/* <Description term="Mã Khách Hàng"><b>{customer._id}</b></Description> */}
            <Description term="Tên Khách Hàng"><b>{customer.name}</b></Description>
            {/* <Description term="Email"><b>{customer.email}</b></Description> */}
            
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="Thông Tin Đơn Hàng" style={{ marginBottom: 32 }}>
            <Description term="NGƯỜI ĐẶT HÀNG"><b>{orderDetail.order_name}</b></Description>
            <Description term="EMAIL NGƯỜI ĐẶT HÀNG "><b>{orderDetail.customer && orderDetail.customer.email}</b></Description>
            <Description term="ĐỊA CHỈ GIAO HÀNG"><b>{orderDetail.delivery_address}</b></Description>
            <Description term="TIME GIAO HÀNG"><b>{orderDetail.delivery_time_str}</b></Description>
            <Description term="SALES FORCE">{orderDetail.sale_force}</Description>
            <Description term="HOTLINE DELI">{orderDetail.hotline_deli}</Description>
            <Description term="EMAIL">{orderDetail.email}</Description>
            <Description term="CC QUA E-MAIL">{orderDetail.cc_email}</Description>
            <Description term="LƯU Ý">{orderDetail.note}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>Thông Tin Sản Phẩm</div>
          <Button onClick={this.handleModalVisible.bind(this,true)}>Add Product</Button>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={productIDs}
            columns={productListColumns}
            rowKey="id"
          />
          {/* <div className={styles.title}>退货进度</div> */}
          {/* <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          /> */}
        </Card>
      </PageHeaderWrapper>
      <Modal
          destroyOnClose
          title="Tạo Sản Phẩm mới"
          visible={modalVisible}
          onOk={this.onAddProducts}
          width={'90%'}
          onCancel={() => this.handleModalVisible()}
        >
       <StandardTable
              selectedRows={selectedRows}
              loading={loading.global}
              data={productList}
              columns={productColumns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
    </Modal>
      </div>
    );
  }
}

export default OrderDetail;
