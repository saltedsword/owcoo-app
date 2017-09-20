import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Checkbox, Button, Form, Input, Notification } from 'element-react';
import { Cascader, RichEditor, FileUpload } from '../common';
import 'element-theme-default';
import PropTypes from 'prop-types';

class PictureSave extends Component {

  componentDidMount(){
    this.props.headerInit([{name: '内容'}, {name: '管理', url: '/admin/manage'}, {name: '编辑图片'}]);
    this.props.pictureInit({id: this.props.params.id, c: this.props.location.query.c});
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
        { required: true, message: '请输入图片标题', trigger: 'blur' }
      ],
      subImgs: [
        { required: true, message: '请上传图片'}
      ]
    }   
    const { picture, picture: {status}, selectedOptions, options, pictureChange, handleSubmit } = this.props;
    const statusValue = !status ? [] : status === 1 ? [1] : status === 2 ? [2] : status === 3 ? [1,2] : [];
    return (
      <div className="form-content">
        <Form model={picture} ref="form" rules={rules} labelWidth="120">
          <Form.Item label="所属栏目" prop="column">
            <Cascader
              options={options} 
              value={selectedOptions} 
              onChange={ (v, s) => { pictureChange({ selectedOptions: s, picture: {...picture, ...{column: v}} })}} />
          </Form.Item>

          <Form.Item label="标题" prop="title">
            <Input value={picture.title} onChange={value => pictureChange({picture: {...picture, ...{title: value}}})}></Input>
          </Form.Item>

          <Form.Item label="状态" prop="status">
            <Checkbox.Group value={statusValue}
              onChange={value => pictureChange({picture: { ...picture, ...{status: (value[0] || 0)+(value[1] || 0)} }})} >
              <Checkbox label="推荐" value={1}></Checkbox>
              <Checkbox label="置顶" value={2}></Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="上传图片" prop="subImgs">
            <FileUpload type="picture" files={picture.subImgs} onChange={files => pictureChange({picture: {...picture, ...{files: files}}})}/>
          </Form.Item>

          <Form.Item label="内容摘要" prop="abstract">
            <Input type="textarea" autosize={{ minRows: 2, maxRows: 4}} value={picture.abstract} onChange={value => pictureChange({picture: {...picture, ...{abstract: value}}})}></Input>
          </Form.Item>

          <Form.Item label="图片说明" prop="content">
            <RichEditor placeholder="填写内容详情..." value={picture.content || ''} onChange={value => pictureChange({picture: {...picture, ...{content: value}}})} />
          </Form.Item>
          
          <Form.Item className="submit-content">
            <Button type="primary" onClick={() => handleSubmit(this.refs.form)}>立即保存</Button>
            
          </Form.Item>
        </Form>
      </div>
    )
  }
}

PictureSave.propTypes = {
  picture: PropTypes.object.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
}

export default PictureSave;