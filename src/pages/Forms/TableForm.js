import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd';
import isEqual from 'lodash/isEqual';
import styles from './style.less';

class TableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
      /* eslint-disable-next-line react/no-unused-state */
      value: props.value,
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    return {
      data: nextProps.value,
      value: nextProps.value,
    };
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item._id === key)[0];
  }

  toggleEditable = (e, key) => {
    console.log(e, key)
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  newMember = () => {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      workId: '',
      name: '',
      department: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  remove(key) {
    const { data } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.key !== key);
    this.setState({ data: newData });
    onChange(newData);
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
    console.log("e", this.state.data)
    
  }

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      
      if (target.product_id && !target.product_id.name) {
        message.error('error ...');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key);
      const { data } = this.state;
      const { onChange } = this.props;
      onChange(data);
      this.setState({
        loading: false,
      });
      this.props.onUpdateProducts(this.state.data)
    }, 500);
    
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      delete this.cacheOriginData[key];
    }
    target.editable = false;
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  render() {
    const columns = [
      {
        title: 'No',
        dataIndex: '',
        key: '',
        width: '5%',
        render: (text, record, index) => {
          return index + 1
        }
      },
      {
        title: 'Product Code',
        dataIndex: 'product_id.prd_code',
        key: 'product_id.prd_code',
        width: '20%',
        render: (text, record) => {
          // if (record.editable) {
          //   return (
          //     <Input
          //       value={text}
          //       autoFocus
          //       onChange={e => this.handleFieldChange(e, 'product_id.prd_code', record._id)}
          //       onKeyPress={e => this.handleKeyPress(e, record._id)}
          //       placeholder="成员姓名"
          //     />
          //   );
          // }
          return text;
        },
      },
      {
        title: 'Name',
        dataIndex: 'alias',
        key: 'alias',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text == undefined ? record.product_id.name : text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'alias', record._id)}
                onKeyPress={e => this.handleKeyPress(e, record._id)}
                placeholder="Alias"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'quantity', record._id)}
                onKeyPress={e => this.handleKeyPress(e, record._id)}
                placeholder="quantity"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'DVT',
        dataIndex: 'product_id.dvt',
        key: 'product_id.dvt',
        width: '20%',
        render: (text, record) => {
          // if (record.editable) {
          //   return (
          //     <Input
          //       value={text}
          //       onChange={e => this.handleFieldChange(e, 'product_id.dvt', record._id)}
          //       onKeyPress={e => this.handleKeyPress(e, record._id)}
          //       placeholder="dvt"
          //     />
          //   );
          // }
          return text;
        },
      },
      {
        title: 'price',
        dataIndex: 'price',
        key: 'price',
        width: '40%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'price', record._id)}
                onKeyPress={e => this.handleKeyPress(e, record._id)}
                placeholder="price"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record._id)}>Save</a>
                  <Divider type="vertical" />
                  <Popconfirm title="Xoa San Pham?" onConfirm={() => this.remove(record._id)}>
                    <a>Remove</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record._id)}>Save</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record._id)}>Cancel</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record._id)}>Edit</a>
              <Divider type="vertical" />
              <Popconfirm title="Xoá Sản Phẩm?" onConfirm={() => this.remove(record._id)}>
                <a>Remove</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const { loading, data } = this.state;

    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={true}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
        {/* <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增成员
        </Button> */}
      </Fragment>
    );
  }
}

export default TableForm;
