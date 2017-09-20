import React, { Component } from 'react';
import { Button, Notification } from 'element-react';
import { Cascader } from '../common';
import { Link , browserHistory } from 'react-router';
import './Release.css';

 
export default class Release extends Component {
  componentDidMount(){
    this.props.headerInit([{name: '内容'}, {name: '发布'}]);
    this.props.releaseInit();
  }

  shouldComponentUpdate(nextProps){
    const { status, msg, pushUrl } = nextProps;
    switch(status) {
      case 'loading': /*Notification.info('loading...');*/ return false;
      case 'error': Notification.error(msg); return false;
      case 'success': return !(pushUrl && browserHistory.push(pushUrl));
      default: return false;
    }
  }

  render() {
    const { options, selectedOptions, column } = this.props;
    const { releaseChange, handleClick } = this.props;

    return (
      <div className="release-box">
        <div className="release-content">
          <h3>发布至</h3>
          <Cascader
            options={options} 
            value={selectedOptions} 
            onChange={ (v, s) => { releaseChange({ selectedOptions: s, column: v})}} />
          <Link to="/admin/column" style={{marginLeft: '15px'}}><Button type="primary">管理栏目</Button></Link>

        </div>
        <div className="release-button">
          <Button type="danger" onClick={() => { if (!column) return Notification.error('需要选择目标栏目'); handleClick(column) } } >下一步</Button>
        </div>
      </div>      
    )
  }
}

