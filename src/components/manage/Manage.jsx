import React, { Component } from 'react';
import { Link } from 'react-router';
import { Layout, Notification, Input } from 'element-react';
import 'element-theme-default';
import './Manage.css';
import imgs from '../../resources/imgs/manage/';

class Manage extends Component {

  componentDidMount(){
    this.props.headerInit([{name: '内容'}, {name: '管理'}]);
    this.props.manageList({ctype: 'module'});
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

  renderManageItems(data, click) {
    let cols = data.map((item,i) =>  
      <Layout.Col key={"col"+i} span="6">
            <div className="grid-content bg-purple">
              <Link to={item.url} className="mlink" onClick={e => click(item, e)}>
                <img src={imgs["tubiao_"+item.module]} alt="" />
                  <h3 className="mname">{item.name}</h3>
              </Link>
            </div>
      </Layout.Col>
    );

   return <Layout.Row gutter="20">{cols}</Layout.Row>
  }

  render(){
    const { noresults, data, linkClass } = this.props;
    const { search, click, handleClick } = this.props;

    return (
      <div className="manage">
        <div className="search">
          <div className="search-left">
            <Input
              icon="search"
              placeholder="请键入栏目关键字查询"
              onChange={v => search(v)}
            />
          </div>
          <div className="search-right">
            <span style={{cursor: 'pointer'}} onClick={() => handleClick('module')} className={linkClass[0]}><i className="el-icon-picture" />按模块分类</span>
            <span style={{cursor: 'pointer'}} onClick={() => handleClick('column')} className={linkClass[1]}><i className="el-icon-menu" />按栏目分类</span>
          </div>
        </div>

        <div className="modules">
          {this.renderManageItems(data, click)}    
        </div>
        <div className="noresults" style={{display: noresults ? 'block' : 'none'}}>
          <img src={imgs['noresults']} width="150" height="150" alt=""/>
          <br/>
          抱歉，没有找到您要搜索的栏目
        </div>
      </div>
    )
  }
}

export default Manage;