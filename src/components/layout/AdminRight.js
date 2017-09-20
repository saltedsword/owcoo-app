import React from 'react';
import { Component } from 'react';
import './AdminRight.css';
import AdminHeader from './AdminHeader'
class AdminRight extends Component {
  render() {
    return (
        <div className="AdminRight">
        	<AdminHeader />
          <div className="content">
            {this.props.children}
          </div>
        </div>
    );
  }
}

export default AdminRight;
