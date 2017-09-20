import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import './Home.css';
import 'font-awesome/css/font-awesome.min.css';

class Home extends Component {

  componentDidMount(){
    this.props.headerInit([]);
  }

  render() {
    return (
      <div>
        <div className="guide">
            <h3>欢迎进入管理后台</h3>
            <div className="guide-content">
              <ul>
                <li>
                  <Link to="/admin/website">
                    <i className="fa fa-newspaper-o" />
                    <span>基本信息</span>
                  </Link>
                  <i className="fa fa-angle-right" />
                </li>
                <li>
                  <Link to="/admin/column">
                    <i className="fa fa-sitemap" />
                    <span>配置栏目</span>
                  </Link>
                  <i className="fa fa-angle-right" />
                </li>
                <li>
                  <Link to="/admin/release">
                    <i className="fa fa-plus" />
                    <span>发布内容</span>
                  </Link>
                  <i className="fa fa-angle-right" />
                </li>
                <li>
                  <Link to="/admin/manage">
                    <i className="fa fa-tachometer" />
                    <span>管理内容</span>
                  </Link>
                  <i className="fa fa-angle-right" />
                </li>
                <li>
                  <Link to="/admin/userList">
                    <i className="fa fa-user-circle-o" />
                    <span>用户管理</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
    );
  }
}

export default Home;
