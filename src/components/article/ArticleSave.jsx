import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Checkbox, Button, Form, Input, Notification } from 'element-react';
import { Cascader, RichEditor } from '../common';
import 'element-theme-default';
import './ArticleSave.css';
import PropTypes from 'prop-types';

class ArticleSave extends Component {

  componentDidMount(){
    this.props.headerInit([{name: '内容'}, {name: '管理', url: '/admin/manage'}, {name: '编辑文章'}]);
    this.props.articleInit({id: this.props.params.id, c: this.props.location.query.c});
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
      ],
      title: [
        { required: true, message: '请输入文章标题', trigger: 'blur' }
      ],
    }    
    const { article, article: {status}, selectedOptions, options, articleChange, handleSubmit } = this.props;
    const statusValue = !status ? [] : status === 1 ? [1] : status === 2 ? [2] : status === 3 ? [1,2] : [];
    return (
      <div className="form-content">
        <Form model={article} ref="form" rules={rules} labelWidth="120">
          <Form.Item label="所属栏目" prop="column">
            <Cascader
              options={options} 
              value={selectedOptions} 
              onChange={ (v, s) => { articleChange({ selectedOptions: s, article: {...article, ...{column: v}} })}} />
          </Form.Item>

          <Form.Item label="标题" prop="title">
            <Input value={article.title} onChange={value => articleChange({article: {...article, ...{title: value}}})}></Input>
          </Form.Item>

          <Form.Item label="状态" prop="status">
            <Checkbox.Group value={statusValue}
              onChange={value => articleChange({article: { ...article, ...{status: (value[0] || 0)+(value[1] || 0)} }})} >
              <Checkbox label="推荐" value={1}></Checkbox>
              <Checkbox label="置顶" value={2}></Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="内容摘要" prop="abstract">
            <Input type="textarea" autosize={{ minRows: 2, maxRows: 4}} value={article.abstract} onChange={value => articleChange({article: {...article, ...{abstract: value}}})}></Input>
          </Form.Item>

          <Form.Item label="详细内容" prop="content">
            <RichEditor placeholder="填写内容详情..." value={article.content || ''} onChange={value => articleChange({article: {...article, ...{content: value}}})} />
          </Form.Item>
          
          <Form.Item className="submit-content">
            <Button type="primary" onClick={() => handleSubmit(this.refs.form)}>立即保存</Button>
            
          </Form.Item>
        </Form>
      </div>
    )
  }
}

ArticleSave.propTypes = {
  article: PropTypes.object.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
}

export default ArticleSave;