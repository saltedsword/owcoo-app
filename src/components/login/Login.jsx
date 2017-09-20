import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Layout, Form, Input, Button, Notification } from 'element-react';
import 'element-theme-default';
import './Login.css';

class Login extends Component {

  shouldComponentUpdate(nextProps){
    const { status, msg } = nextProps;
    switch(status) {
      case 'loading': /*Notification.info('loading...');*/ return false;
      case 'error': Notification.error(msg); return false;
      case 'success': return true;
      case 'loginSuccess': browserHistory.push('/admin'); return false;
      default: return false;
    }
  }

  render() {
    const rules = {
      userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
      ],
      pass: [
        { required: true, message: '请输入密码', trigger: 'blur' },
      ],
    }
    const { loginChange, login, handleSave, handleReset } = this.props;

    return (
      <div className="login-form">
        <Layout.Row>
          <Layout.Col xs="2" sm="6" md="8" lg="8" style={{paddingLeft:'5px',paddingRight:'5px'}}>&nbsp;</Layout.Col>
          <Layout.Col xs="20" sm="12" md="8" lg="8" style={{padding: '15px'}}>
            <Form ref="form" model={login} rules={rules} labelWidth="80" className="demo-ruleForm login-container">
              <h3 className="pannel-title"><span>管理员登录</span></h3>
              <Form.Item label="用户名" prop="userName">
                <Input value={login.userName} onChange={(v) => loginChange({login: {...login, ...{userName: v}}})} onKeyDown={e => {if(e.keyCode === 13) handleSave(this.refs.form)}}/>
              </Form.Item>
              <Form.Item label="密码" prop="pass">
                <Input type="password" value={login.pass} onChange={(v) => loginChange({login: {...login, ...{pass: v}}})} onKeyDown={e => {if(e.keyCode === 13) handleSave(this.refs.form)}}/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={(e) => handleSave(this.refs.form)}>登录</Button>
                <Button onClick={() => handleReset(this.refs.form)}>重置</Button>
              </Form.Item>
            </Form>
          </Layout.Col>
          <Layout.Col xs="2" sm="6" md="8" lg="8" style={{paddingLeft:'5px',paddingRight:'5px'}}>&nbsp;</Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}


export default Login;