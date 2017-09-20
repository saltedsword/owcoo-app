import React, { Component } from 'react';
import { Button, Select, Table, Pagination, Form, Input, Dialog, Notification } from 'element-react';
import 'element-theme-default';

class UserList extends Component {
  
  constructor(props) {
    super(props);
    this.columns = [
      {
        type: 'selection'
      },
      {
        label: "用户名",
        prop: "userName",
        width: 150
      },
      {
        label: "用户组",
        prop: "userGroup",
        width: 200
      },
      {
        label: "姓名",
        prop: "name",
        width: 120,
      },
      {
        label: "联系方式",
        prop: "phone",
        width: 150
      },
      {
        label: "邮箱",
        prop: "email",
        width: 200
      },
      {
        label: "操作",
        prop: "operation",
        fixed: 'right',
        width: 200,
        render: data => {
          return (
            <div>
              <Button plain={true} type="info" size="mini" onClick={ () => this.props.update(data._id) }>编辑</Button>
              <Button type="danger" size="mini" onClick={ () => this.props.remove(data._id) }>删除</Button>
            </div>
          )
        }
      }
    ]
    this.rules = {
      userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
      name: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
      ],
      pass: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.props.user.checkPass !== '') {
              this.refs.form.validateField('checkPass');
            }
            callback();
          }
        } }
      ],
      checkPass: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.props.user.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        } }
      ],
      userGroup: [
        { required: true, message: '请选择用户组', trigger: 'change' }
      ],
      email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
      ],
    }
  }

  componentDidMount(){
    this.props.headerInit([{name: '系统管理'}, {name: '用户管理'}]);
    this.props.userList();
  }

  shouldComponentUpdate(nextProps){
    const { status, msg } = nextProps;
    switch(status) {
      case 'loading': /*Notification.info('loading...');*/ return false;
      case 'error': Notification.error(msg); return false;
      case 'success': return true;
      default: return false;
    }
  }

  render() {
    const {data, total, currentPage, user, userGroups, dialogVisible} = this.props;
    const { userChange, handleSave, handlePage, handleReset, update } = this.props;

    return (
      <div>
        <div className="list-toolbar">
          <div className="add-button">
            <Button type="danger" onClick={() => update()}>添加管理员</Button>
          </div>
        </div>
        
        <Table
            style={{width: '100%'}}
            columns={this.columns}
            data={data}
          />
        <div className="pagination">
          <Pagination 
            layout="total, prev, pager, next, jumper" 
            total={total} 
            pageSize={10} 
            currentPage={currentPage}
            onCurrentChange={currentPage=>handlePage(currentPage)}/>
        </div>

        <Dialog
          title="填写用户信息"
          visible={ dialogVisible }
          onCancel={ () => userChange({ dialogVisible: false }) }
        >
          <Dialog.Body>
            <Form model={user} ref="form" rules={this.rules} labelWidth="120">
              <Form.Item label="用户名" prop="userName">
                <Input value={user.userName} onChange={ v => userChange({user: {...user, ...{userName: v}}}) }></Input>
              </Form.Item>
              <Form.Item label="姓名" prop="name">
                <Input value={user.name} onChange={ v => userChange({user: {...user, ...{name: v}}}) }></Input>
              </Form.Item>
              <Form.Item label="密码" prop="pass">
                <Input type="password" value={user.pass} onChange={ v => userChange({user: {...user, ...{pass: v}}}) } autoComplete="off" />
              </Form.Item>
              <Form.Item label="确认密码" prop="checkPass">
                <Input type="password" value={user.checkPass} onChange={ v => userChange({user: {...user, ...{checkPass: v}}}) } autoComplete="off" />
              </Form.Item>
              <Form.Item label="用户组" prop="userGroup">
                <Select value={user.userGroup} placeholder="请选择用户组" onChange={ v => userChange({user: {...user, ...{userGroup: v}}}) }>
                  {
                    userGroups.map((item, i) => {return <Select.Option key={i} label={item.name} value={item._id} />})
                  }
                </Select>
              </Form.Item>
              <Form.Item label="电话" prop="phone">
                <Input value={user.phone} onChange={ v => userChange({user: {...user, ...{phone: v}}}) }></Input>
              </Form.Item>
              <Form.Item prop="email" label="邮箱">
                <Input value={user.email} onChange={ v => userChange({user: {...user, ...{email: v}}}) }></Input>
              </Form.Item>
              <Form.Item label="备注" prop="remarks">
                <Input type="textarea" value={user.remarks} onChange={ v => userChange({user: {...user, ...{remarks: v}}}) }></Input>
              </Form.Item>
            </Form>
          </Dialog.Body>

          <Dialog.Footer className="dialog-footer">
            <Button type="primary" onClick={() => handleSave(this.refs.form)}>确 定</Button>
            <Button onClick={() => handleReset(this.refs.form)}>重置</Button>
          </Dialog.Footer>
        </Dialog>

      </div>
    )
  }
}

export default UserList;