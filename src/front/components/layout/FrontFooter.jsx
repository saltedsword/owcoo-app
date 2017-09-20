import React, { Component } from 'react';
import { Link } from 'react-router';
import { Layout } from 'element-react';
import 'element-theme-default';
import './FrontFooter.css';

class FrontFooter extends Component {
  
  componentDidMount(){
    this.props.frontFooterInit();
  }

  render() {
    const { tree, rights } = this.props;

    return (
      <div className="front-footer">
        <div className="footer">
          <div className="bg"></div>
          <Layout.Row>
            {this.renderTree(tree)}
          </Layout.Row>
        </div>
        <div className="copyright">
          <p>{rights}</p>
        </div>
      </div>
    )
  }

  renderTree(tree) {
    const span = tree && tree.length > 0 ?  tree.length > 4 ? 6 : 24/tree.length : 6;
    const paddingLeft = 1000*span/24/2 - 50;
    const footerTree = tree.map((el, i) => (
      <Layout.Col span={span} style={{paddingLeft: paddingLeft+'px'}} key={i}>
        <h3><Link to={el.link} >{el.name}</Link></h3>
        <ul className="list">
          {
            el.children.map((child, j) => <li key={j} ><Link to={child.link} >{child.name}</Link></li>)
          }
        </ul>
      </Layout.Col>
    ))
    return footerTree;
  }
}

export default FrontFooter;