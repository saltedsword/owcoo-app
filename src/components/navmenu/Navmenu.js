import React, { Component } from 'react';
import { browserHistory, IndexLink } from 'react-router';
import './navmenu.css';
import { Menu } from 'element-react';
import 'element-theme-default';
import logo from '../../resources/imgs/logo.png';

class Navmenu extends Component {
  constructor(props) {
    super(props);

    this.tree = JSON.parse(localStorage.getItem('menusTree'));
  }

  onSelect(path) {
    if (path !== '/')
      browserHistory.push(path);
  }

  render() {

    return (
        <div className="Navmenu">
          <Menu className="el-menu-vertical-demo" theme="dark" onSelect = {this.onSelect.bind(this)} uniqueOpened={true}>
            <Menu.Item index="/admin" style={{padding: '0px', height: '72px'}}><img src={logo} style={{height: '70px', width: '200px'}} alt=""/></Menu.Item>
            <IndexLink to="/" target="_blank"><Menu.Item index="/"><i className="el-icon-d-arrow-left"></i>前台首页</Menu.Item></IndexLink>
            {
              this.tree.map((menu1, i) => {
                if (menu1.children && menu1.children.length > 0)
                  return (<Menu.SubMenu key={`sub${i}`} index={menu1.value} title={<span><i className={"el-icon-" + (menu1.icon || "message")}></i>{menu1.label}</span>}>
                    {
                      menu1.children.map((menu2, j) => {
                        return <Menu.Item key={`item${i}${j}`} index={menu2.value}>{menu2.label}</Menu.Item>
                      })
                    }
                  </Menu.SubMenu>)
                return <Menu.Item key={`sub${i}`} index={menu1.value}><i className={"el-icon-" + (menu1.icon || "menu")}></i>{menu1.label}</Menu.Item>
              })
            }
          </Menu>
        </div>
    );
  }
}

export default Navmenu;