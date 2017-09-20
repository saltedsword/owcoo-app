import React from 'react';
import { Component } from 'react';
import { Layout, Breadcrumb } from 'element-react';
import { Link, IndexLink } from 'react-router';
import 'element-theme-default';
import './FrontContent.css';

class FrontContent extends Component {

  render() {
    const { paths, columns, columnTitle } = this.props;
    return (
        <div className="front-content clearfix">
          <div className="front-guide">
            {this.renderBreadcrumb(paths)}
          </div>

          <div className="front-space">
            <div className="item_l">
              <h2>{columnTitle}</h2>
              <Layout.Row>
                {this.renderColumns(columns)}
              </Layout.Row>
            </div>

            <div className="item_r">
              {this.props.children}
            </div>
          </div>
        </div>
    );
  }

  renderBreadcrumb(paths) {
    return  <Breadcrumb separator=">">
              <Breadcrumb.Item><IndexLink to="/">首页</IndexLink></Breadcrumb.Item>
              {
                paths.map((el, i) => <Breadcrumb.Item key={i}><Link to={el.link} >{el.name}</Link></Breadcrumb.Item>)
              }
            </Breadcrumb>
  }

  renderColumns(columns) {
    const result = [];
    columns.forEach((el, i) => {
      result.push(<Layout.Col key={i} className={el.cur ? 'cur' : null}><Link className={`class${el.level}`} to={el.link}>{el.name}</Link></Layout.Col>)
      if (el.children) {
        el.children.forEach((cl, j) => result.push(<Layout.Col key={j} ><Link className={`class${el.level}`} to={cl.link}>{cl.name}</Link></Layout.Col>))
      }
    })
    return result;
  }
}

export default FrontContent;
