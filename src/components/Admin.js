import React from 'react';
import { Component } from 'react';
import './Admin.css';
import AdminLeft from './layout/AdminLeft';
import AdminRight from './layout/AdminRight';


class Admin extends Component {
  render() {
    return (
      <div className="Admin">
        <AdminLeft />
        <AdminRight>
          {this.props.children}
        </AdminRight>
      </div>
    );
  }
}

export default Admin;
