import React, { Component } from 'react';
import './AdminLeft.css';
import Navmenu from '../navmenu/Navmenu';
class AdminLeft extends Component {
  render() {
    return (
        <div className="AdminLeft">
          <Navmenu />
        </div>
    );
  }
}

export default AdminLeft;