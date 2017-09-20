import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { Menu } from 'element-react';
import 'element-theme-default';
import './FrontHeader.css';
import 'font-awesome/css/font-awesome.min.css';

class Header extends Component {

  componentDidMount(){
    this.props.frontHeaderInit();
  }

  render() {
    const { tree, logo } = this.props;
    
    return (
      <div className="front-header">
        <div className="front-top">
          <span className="tel"><i className="fa fa-phone" />15106200261</span>
        </div>
        <div className="front-navmenu-wrap">
          <div className="front-navmenu">
            <div className="logo">
              <IndexLink to="/" title="owcoo首页"><img src={logo} style={{width: '170px', height: '60px'}} alt="owcoo" /></IndexLink>
            </div>
            <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" >
              <IndexLink to="/" ><Menu.Item index="/">首页</Menu.Item></IndexLink>
              {this.renderTree(tree)}
            </Menu>
          </div>
        </div>
      </div>
    )
  }

  renderTree(tree) {
    const headerTree = tree.map((menu1, i) => {
      if (menu1.children && menu1.children.length > 0)
        return (<Menu.SubMenu key={i} index={menu1._id} title={<Link to={menu1.link} >{menu1.name}</Link>}>
          {
            menu1.children.map((menu2, j) => {
              return <Link to={menu2.link} key={j}><Menu.Item index={menu2._id}>{menu2.name}</Menu.Item></Link>
            })
          }
        </Menu.SubMenu>)
      return <Link to={menu1.link} key={i}><Menu.Item index={menu1._id}>{menu1.name}</Menu.Item></Link>
    })
    return headerTree;
  }  
}

export default Header;