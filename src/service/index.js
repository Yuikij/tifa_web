// import styles from './index.css';
// import BreadcrumbCustom from '../../../../components/BreadcrumbCustom';
// import {
//   Layout,
//   Input,
//   Table,
//   Form,
//   Icon,
//   Button,
//   Row,
//   Col,
//   Select,
//   BackTop,
//   Spin,
//   Popconfirm,
//   Radio,
// } from 'antd';
// import { userColumns } from '../../../../components/common/Columns';
// import React, { Component } from 'react';
// import { connect } from 'dva';
// import storage from '../../../../utils/localStorage';
// import { checkUserExist } from '@/services/userServices';
// import { messageInfo } from '@/components/common/messageInfo';
//
// const { Option } = Select;
// const Search = Input.Search;
// const { Content } = Layout;
// const formItemLayout = {
//   labelCol: { span: 12 },
//   wrapperCol: { span: 12 },
// };
//
// function getRoleValue(list, text, record_key, record_value) {
//   let result = '';
//   list.map((record, index) => {
//     const key = record[record_key];
//     if (key === text) {
//       result = record[record_value];
//     }
//     return 0;
//   });
//   return result;
// }
//
// class Users extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       saveType: '',
//       userid: '',
//       disabled: true,
//       selectedRowKey: '',
//       fromTitle: '',
//       passwordState: true,
//     };
//     userColumns[1].render = (text, record) => {
//       const { RoleList } = this.props;
//       return (
//         <label>{getRoleValue(RoleList, text, 'role_key', 'role_value')}</label>
//       );
//     };
//     userColumns[2].render = (text, record) => {
//       const { LevelList } = this.props;
//       return (
//         <div>
//           {LevelList.map((res) => res.level_key === text ? <span key={record.key}>{res.level_value}</span> : '')}
//         </div>
//       );
//     };
//     userColumns[3].render = (text, record) => {
//       return storage.getUserRole() === 1?<Popconfirm title={`请确认是否切换为${text === 1?'禁用':'启用'}`} onConfirm={this.changeStatus.bind(this, record)} okText="是"
//                          cancelText="否"
//                          icon={<Icon type="question-circle"/>}>
//         {text === 1 ? <div style={{ color: 'green',cursor: 'pointer' }}>启用</div> : <div style={{ color: 'red',cursor: 'pointer' }}>停用</div>}
//       </Popconfirm>:text === 1 ? <div style={{ color: 'green'}}>启用</div> : <div style={{ color: 'red'}}>停用</div>;
//     };
//
//     const renderFun = (text, record) => {
//       return (
//         record.role === 1 && storage.getUserRole() === 2 ?
//           <div>
//             <Icon type="edit"
//                   style={{ marginRight: 10, color: '#858d91', fontSize: 16 }}
//                   title="无权限"
//             />
//             <Icon type="delete" style={{ color: '#858d91', fontSize: 16 }}
//                   title="无权限"
//             />
//           </div> :
//           <div>
//             <Icon type="edit"
//                   style={{ marginRight: 10, color: '#0096ff', fontSize: 16, cursor: 'pointer' }}
//                   title="修改" onClick={this.showSetConfirm.bind(this, record)}
//             />
//             <Popconfirm title='请确认是否删除?' onConfirm={this.showDeleteConfirm.bind(this, record)} okText="是" cancelText="否"
//                         icon={<Icon type="question-circle"/>}>
//               <Icon type="delete" style={{ color: '#fd7a7a', fontSize: 16, cursor: 'pointer' }}
//                     title="删除"
//               />
//             </Popconfirm>
//           </div>
//       );
//     };
//     if (storage.isNormalUser() && userColumns.length === 5) {
//       userColumns.splice(4, 1);
//     }
//     if (!storage.isNormalUser()) {
//       if (userColumns.length === 4) {
//         userColumns.splice(4, 0, {
//           title: '操作',
//           dataIndex: 'operation',
//           key: 'operation',
//           align: 'center',
//           render: renderFun,
//         });
//       } else {
//         userColumns[4].render = renderFun;
//       }
//     }
//
//     // userColumns[4].render = (text, record) => {
//     //   return (
//     //     <div>
//     //       <Icon type="edit"
//     //             style={{ marginRight: 10, color: '#0096ff', fontSize: 16, cursor: 'pointer' }}
//     //             title="修改" onClick={this.showSetConfirm.bind(this, record)}
//     //       />
//     //       <Popconfirm title='请确认是否删除?' onConfirm={this.showDeleteConfirm.bind(this, record)} okText="是" cancelText="否"
//     //                   icon={<Icon type="question-circle"/>}>
//     //         <Icon type="delete" style={{ color: '#fd7a7a', fontSize: 16, cursor: 'pointer' }}
//     //               title="删除"
//     //         />
//     //       </Popconfirm>
//     //     </div>
//     //   );
//     // };
//   }
//
//   changeStatus = (record) => {
//     // record.is_valid = record.is_valid===1 ? 2 : 1;
//     let values = {...record,is_valid:record.is_valid===1 ? 2 : 1,};
//     const { dispatch } = this.props;
//     dispatch({
//       type: 'userDate/getSetUser',
//       payload: { values },
//     });
//   };
//
// //编辑
//   showSetConfirm = (record) => {
//
//     const { dispatch } = this.props;
//     dispatch({
//       type: 'userDate/setVisible',
//       payload: { record, visible: true },
//     });
//
//     this.onRowClick(record, record.key);
//     this.setState({
//       saveType: 'edit',
//       disabled: true,
//       fromTitle: '用户编辑',
//       passwordState: false,
//       record,
//       modifyPwd: false,
//       isNewPsd: false,
//     });
//     this.goBottom();
//   };
//
// //删除
//   showDeleteConfirm = (record) => {
//     const { dispatch } = this.props;
//     storage.add('userId', record.userid);
//     dispatch({
//       type: 'userDate/getDelUser',
//     });
//   };
//
// //添加
//   userAdd = () => {
//     const { dispatch } = this.props;
//     dispatch({
//       type: 'userDate/setVisible',
//       payload: { record: {}, visible: true },
//     });
//     this.onRowClick(null, null);
//     this.setState({
//       saveType: 'add',
//       disabled: false,
//       fromTitle: '用户新增',
//       passwordState: true,
//       modifyPwd: true,
//       isNewPsd: true,
//       startPwd: false,
//       noRepeatPwd: false,
//       startConfirmPwd: false,
//       simplePwd: false,
//       oldPwd: null,
//       confirmPwd: null,
//       newPwd: null,
//     });
//     this.goBottom();
//   };
//
//   goBottom = () => {
//     setTimeout(function() {
//       let divEle = document.getElementById('user_id');
//       divEle.scrollTop = divEle.scrollHeight;
//     }, 1);
//     this.props.form.resetFields();
//   };
//
//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.form.validateFields((err, values) => {
//       const { simplePwd, noRepeatPwd } = this.state;
//       if (simplePwd || noRepeatPwd) {
//         return;
//       }
//       values.password = values.newPwd;
//       for (let v in values) {
//         if (values[v] === undefined || values[v] === '') {
//           delete values[v];
//         }
//       }
//
//
//       if (!err) {
//         const { dispatch, fromData } = this.props;
//         const { saveType } = this.state;
//         if (saveType === 'add') {
//           dispatch({
//             type: 'userDate/getAddUser',
//             payload: { values },
//           });
//           dispatch({
//             type: 'userDate/setVisible',
//             payload: { record: {}, visible: true },
//           });
//           // this.closeClick();
//         } else if (saveType === 'edit') {
//           values['userid'] = fromData.userid;
//           dispatch({
//             type: 'userDate/getSetUser',
//             payload: { values },
//           });
//         }
//         // this.closeClick();
//         // this.onRowClick(null, '');
//       }
//     });
//   };
//
//   // from关闭
//   closeClick = () => {
//     const { dispatch } = this.props;
//     dispatch({
//       type: 'userDate/setVisible',
//       payload: { visible: false },
//     });
//   };
//
//   gettingDaTas_Type = (v) => {
//     this.closeClick();
//     const { dispatch } = this.props;
//     dispatch({
//       type: 'userDate/getUsersTable',
//       payload: {
//         pageIndex: 1,
//         pageSize: 10,
//         keyword: v,
//       },
//     });
//   };
//
//   checkUser = () => {
//     const { oldPwd, record } = this.state;
//     checkUserExist({ password: oldPwd, username: record.username }).then((data) => {
//       if (data && data.data) {
//         if (data.data.success) {
//           messageInfo('success', data.data.msg || '密码正确');
//           this.setState({ isNewPsd: true });
//         } else {
//           messageInfo('error', data.data.msg || '请求失败');
//         }
//       } else {
//         messageInfo('error', '请求失败');
//       }
//     });
//
//
//   };
//
//   onOldPwdChange = (e) => {
//     this.setState({
//       oldPwd: e.target.value,
//     });
//   };
//
//   onRowClick = (record, rowKey) => {
//     this.setState({
//       selectedRowKey: rowKey,
//     });
//   };
//
//   resetPwdState = () => {
//     this.setState({
//       isNewPsd: false,
//       startPwd: false,
//       noRepeatPwd: false,
//       startConfirmPwd: false,
//       simplePwd: false,
//       oldPwd: null,
//       confirmPwd: null,
//       newPwd: null,
//     });
//   };
//
//   newPwdChange = (e) => {
//     let reg = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\x20-\x7e]{6,12}$/);
//     let { confirmPwd } = this.state;
//     this.setState({
//       startPwd: true,
//       newPwd: e.target.value,
//       simplePwd: !reg.test(e.target.value),
//       noRepeatPwd: confirmPwd !== e.target.value,
//     });
//   };
//
//   confirmPwdChange = e => {
//     let { newPwd } = this.state;
//     this.setState({ startConfirmPwd: true, noRepeatPwd: newPwd !== e.target.value, confirmPwd: e.target.value });
//   };
//
//   render() {
//     const {
//       dataSource, visible, fromData, RoleList, LevelList, ValidList, userTableTotal, userTableCurrent, dispatch, spinning,
//     } = this.props;
//     const { getFieldDecorator } = this.props.form;
//     const { saveType, modifyPwd, isNewPsd, simplePwd, startPwd, startConfirmPwd, noRepeatPwd } = this.state;
//     return (
//       <div className={styles.user_box} id='user_id'>
//         <Content className="">
//           <BreadcrumbCustom top='用户管理'/>
//         </Content>
//         <Content className={styles.ContentStyle}>
//           <Search
//             placeholder="输入关键字搜索"
//             onSearch={(value) => {
//               this.gettingDaTas_Type(value);
//             }}
//             enterButton
//             style={{ width: 360 }}
//           />
//         </Content>
//         <Content className={styles.user_content}>
//           {!storage.isNormalUser() && <div className={styles.button_warp}>
//             <Button type="primary" onClick={this.userAdd}><Icon type="plus"/>增加</Button>
//           </div>}
//           <Spin spinning={spinning}>
//             <Table columns={userColumns} dataSource={dataSource} bordered locale={{ emptyText: '暂无数据' }}
//                    rowKey={record => record.userid}
//                    pagination={{
//                      hideOnSinglePage: true,
//                      total: userTableTotal,//数据总数
//                      current: userTableCurrent,//当前页数
//                      onChange: (page, pageSize) => {
//                        // console.log(pageSize, page);
//                        dispatch({
//                          type: 'userDate/getUsersTable',
//                          payload: {
//                            pageIndex: page,
//                            pageSize: pageSize,
//                          },
//                        });
//                      },
//                      pageSize: 10,
//                    }}
//               // onRow={(record, rowkey) => {
//               //   return {
//               //     onClick: this.onRowClick.bind(this, record, rowkey),   //点击行 record 指的本行的数据内容，rowkey指的是本行的索引
//               //   };
//               // }}
//                    rowClassName={(record, rowkey) => {
//                      if (rowkey === this.state.selectedRowKey) {
//                        // isSelected = false;
//                        return styles.clickRowStyl;
//                      }
//                    }}
//             />
//           </Spin>
//         </Content>
//         {visible ? <Content className={styles.userfrom_content} id='user_from'>
//           <div className={styles.user_title_box}>
//             <p>{this.state.fromTitle}</p>
//             <Icon type="close" onClick={this.closeClick}/>
//           </div>
//           <Form onSubmit={this.handleSubmit}>
//             <div className={styles.user_from_box}>
//               <Row>
//                 <Col span={7}>
//                   <Form.Item label="用户行政级别：" {...formItemLayout} >
//                     {getFieldDecorator('level', {
//                       initialValue: fromData.level === 0 || fromData.level ? fromData.level.toString() : '',
//                       rules: [{ message: '选择用户行政级别!', required: true }],
//                     })(
//                       <Select placeholder='选择用户行政级别'>
//                         {LevelList.map((dept) => <Option key={dept.level_key}>{dept.level_value}</Option>)}
//                       </Select>,
//                     )}
//                   </Form.Item>
//                 </Col>
//                 <Col span={7}>
//                   <Form.Item label="是否可用：" {...formItemLayout} >
//                     {getFieldDecorator('is_valid', {
//                       initialValue: fromData.is_valid,
//                       rules: [{ message: '选择是否可用!', required: true }],
//                     })(
//                       <Radio.Group>
//                         {/*<Radio value="1">启用</Radio>*/}
//                         {/*<Radio value="0">停用</Radio>*/}
//                         {ValidList.map((dept) => <Radio value={dept.is_valid_key}>{dept.is_valid_value}</Radio>)}
//                       </Radio.Group>,
//                       // <Select placeholder='选择是否可用'>
//                       //   {ValidList.map((dept) => <Option key={dept.is_valid_key}>{dept.is_valid_value}</Option>)}
//                       // </Select>,
//                     )}
//                   </Form.Item>
//                 </Col>
//                 <Col span={7}>
//                   <Form.Item label="用户权限：" {...formItemLayout} >
//                     {getFieldDecorator('role', {
//                       initialValue: fromData.role ? fromData.role.toString() : '',
//                       rules: [{ message: '选择用户权限!', required: true }],
//                     })(
//                       <Select placeholder='选择用户权限'>
//                         {RoleList.map((dept) => dept.role_key === 1 && storage.getUserRole() === 2 ? null :
//                           <Option key={dept.role_key}>{dept.role_value}</Option>)}
//
//                       </Select>,
//                     )}
//                   </Form.Item>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col span={7}>
//                   <Form.Item label="用户名：" {...formItemLayout} >
//                     {getFieldDecorator('username', {
//                       initialValue: fromData.username,
//                       rules: [{ message: '请输入用户名！', required: true }],
//                     })(
//                       <Input placeholder="请输入用户名" disabled={this.state.disabled}/>,
//                     )}
//                   </Form.Item>
//                   {saveType === 'edit' && <Button type="primary" onClick={() => {
//                     this.setState((prevState => ({ modifyPwd: !prevState.modifyPwd })));
//                     this.resetPwdState();
//                   }} className={styles.user_button}>{modifyPwd ? '取消修改' : '修改密码'}</Button>}
//                 </Col>
//                 {
//                   modifyPwd && !isNewPsd ? <Col span={7}>
//                     <Form.Item label="旧密码：" {...formItemLayout}  >
//                       {getFieldDecorator('password', {
//                         rules: [{
//                           message: '请输入旧密码!', required: false,
//                         }],
//                       })(
//                         <Input type="password" placeholder="请输入旧密码" onChange={this.onOldPwdChange}/>,
//                       )}
//                     </Form.Item>
//                     <Button type="primary" onClick={this.checkUser} className={styles.user_button}>确定</Button>
//
//                   </Col> : null
//                 }
//                 {
//                   modifyPwd && isNewPsd ? [<Col span={7}>
//                     <Form.Item label="用户密码：" {...formItemLayout}  >
//                       {getFieldDecorator('newPwd', {
//                         rules: [{
//                           message: '请输入用户密码!', required: true,
//                         }],
//                       })(
//                         <Input type="password" onChange={this.newPwdChange} autoComplete="new-password"
//                                placeholder="请输入新密码"/>,
//                       )}
//                     </Form.Item>
//                     {startPwd ? (simplePwd ? <span style={{
//                       width: 147,
//                       color: '#ff6000',
//                       position: 'absolute',
//                       right: -165,
//                       top: 0,
//                     }}>
//                       <Icon style={{ marginRight: 5 }} type="warning"/>密码由6-12位数字、大小写字母组成</span> : <span style={{
//                       width: 220,
//                       color: 'green',
//                       position: 'absolute',
//                       right: -230,
//                       top: 10,
//                     }}>
//                       <Icon style={{ marginRight: 5 }} type="check-circle"/></span>) : null}
//                   </Col>, <Col span={7}>
//                     <Form.Item label="确认密码：" {...formItemLayout}  >
//                       {getFieldDecorator('confirmPwd', {
//                         initialValue: '',
//                         rules: [{
//                           message: '请输入用户密码!', required: true,
//                         }],
//                       })(
//                         <Input onChange={this.confirmPwdChange} type="password" autoComplete="new-password"
//                                placeholder="请确认新密码"/>,
//                       )}
//                     </Form.Item>
//                     {startConfirmPwd ? (noRepeatPwd ? <span style={{
//                       width: 220,
//                       color: '#ff6000',
//                       position: 'absolute',
//                       right: -230,
//                       top: 10,
//                     }}>
//                       <Icon style={{ marginRight: 5 }} type="warning"/>两次密码不相同</span> : <span style={{
//                       width: 220,
//                       color: 'green',
//                       position: 'absolute',
//                       right: -230,
//                       top: 10,
//                     }}>
//                       <Icon style={{ marginRight: 5 }} type="check-circle"/></span>) : null}
//                   </Col>] : null
//                 }
//
//                 {/*<Form.Item label="用户密码：" {...formItemLayout}  >*/}
//                 {/*{getFieldDecorator('password', {*/}
//                 {/*rules: [{*/}
//                 {/*message: '请输入用户密码!', required: this.state.passwordState,*/}
//                 {/*}],*/}
//                 {/*})(*/}
//                 {/*<Input placeholder="请输入用户密码"/>,*/}
//                 {/*)}*/}
//                 {/*</Form.Item>*/}
//                 {/*<Col span={7}>*/}
//
//                 {/*</Col>*/}
//               </Row>
//               <Button type="primary" htmlType="submit" style={{ float: 'right', marginTop: '-77px' }}>
//                 提交
//               </Button>
//             </div>
//
//           </Form>
//         </Content> : null}
//         <BackTop className="top-back-btn"
//                  target={() => document.getElementById('user_id')}
//                  visibilityHeight="100">
//         </BackTop>
//       </div>
//     );
//   }
// }
//
//
// function mapStateToProps(state) {
//   const {
//     dataSource, visible, fromData, RoleList, LevelList, ValidList, userTableTotal, userTableCurrent, spinning,
//   } = state.userDate;
//   return {
//     ...state,
//     dataSource,
//     visible,
//     fromData,
//     RoleList,
//     LevelList,
//     ValidList,
//     userTableTotal,
//     userTableCurrent,
//     spinning,
//   };
// }
//
// const UserFrom = Form.create()(Users);
//
// export default connect(mapStateToProps)(UserFrom);
//
