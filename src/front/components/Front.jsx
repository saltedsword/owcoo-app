import React from 'react';
import { Component } from 'react';
import './Front.css';
import FrontHeader from './layout/FrontHeader';
import FrontFooter from './layout/FrontFooter';
import FrontContent from './layout/FrontContent';
import DocumentMeta from 'react-document-meta';

class Front extends Component {

  render() {
    const { meta } = this.props;

    return (
      <DocumentMeta {...meta}>
        <div className="front">
          <FrontHeader />
          <FrontContent>
            {this.props.children}
          </FrontContent>
          <FrontFooter />
        </div>
      </DocumentMeta>
    );
  }
}

export default Front;
