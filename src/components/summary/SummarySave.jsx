import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Form, Notification } from 'element-react';
import { Cascader, RichEditor } from '../common';
import 'element-theme-default';
import PropTypes from 'prop-types';

class SummarySave extends Component {

  componentDidMount(){
    this.props.headerInit([{name: '内容'}, {name: '管理', url: '/admin/manage'}, {name: '编辑简介'}]);
    this.props.summaryInit({id: this.props.params.id, c: this.props.location.query.c});
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
    const rules = {
      column: [
        { required: true, message: '请选择所属栏目', trigger: 'change' }
      ]
    }   
    const { summary, selectedOptions, options, summaryChange, handleSubmit } = this.props;

    return (
      <div className="form-content">
        <Form model={summary} ref="form" rules={rules} labelWidth="120">
          <Form.Item label="所属栏目" prop="column">
            <Cascader
              options={options} 
              value={selectedOptions} 
              onChange={ (v, s) => { summaryChange({ selectedOptions: s, summary: {...summary, ...{column: v}} })}} />
          </Form.Item>

          <Form.Item label="简介内容" prop="content">
            <RichEditor placeholder="填写内容详情..." value={summary.content || ''} onChange={value => summaryChange({summary: {...summary, ...{content: value}}})} />
          </Form.Item>
          
          <Form.Item className="submit-content">
            <Button type="primary" onClick={() => handleSubmit(this.refs.form)}>立即保存</Button>
            
          </Form.Item>
        </Form>
      </div>
    )
  }
}

SummarySave.propTypes = {
  summary: PropTypes.object.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
}

export default SummarySave;