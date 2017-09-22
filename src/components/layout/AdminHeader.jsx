import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Breadcrumb, Dropdown, MessageBox } from 'element-react';
import 'element-theme-default';
import './AdminHeader.css';
import './Common.css';

class Header extends Component {

  handleCommand(command) {
    if (command === 'logout') this.logout();
  }

  logout() {
    MessageBox.confirm('确认退出吗?', '提示', {
      type: 'warning'
    }).then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('menusTree');

      browserHistory.push('/admin/login');
    }).catch((err) => { console.log(err) });
  }

  render(){
    return (
      <div className="header">
        <div className="breadcrumb">
          <Breadcrumb separator="/">
            <Breadcrumb.Item><Link to="/admin">首页</Link></Breadcrumb.Item>
            {
              this.props.paths.map((el, i) => {
                return <Breadcrumb.Item key={i}>
                {
                  el.url ? <Link to={el.url}>{el.name}</Link> : el.name
                }
                </Breadcrumb.Item>
              })
            }
          </Breadcrumb>
        </div>

      <div className="user-box">
        <Dropdown trigger="hover" onCommand={this.handleCommand.bind(this)} menu={(
              <Dropdown.Menu className="dropdown">
                <Dropdown.Item disabled>个人设置</Dropdown.Item>
                <Dropdown.Item divided command="logout">退出登录</Dropdown.Item>
              </Dropdown.Menu>
            )}>
              <span className="el-dropdown-link">
                {localStorage.getItem('user') ? localStorage.getItem('user').userName : '' }<i className="el-icon-caret-bottom el-icon--right"></i>
              </span>
            </Dropdown>
      </div>
    </div>
    )
  }
  
}

export default Header;