import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Checkbox, Button, Form, Input, Notification } from 'element-react';
import { Cascader, RichEditor, FileUpload } from '../common';
import 'element-theme-default';
import PropTypes from 'prop-types';

class ProductSave extends Component {

  componentDidMount(){
    this.props.headerInit([{name: '内容'}, {name: '管理', url: '/admin/manage'}, {name: '编辑产品'}]);
    this.props.productInit({id: this.props.params.id, c: this.props.location.query.c});
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
        { required: true, message: '请输入产品标题', trigger: 'blur' }
      ],
      subImgs: [
        { required: true, message: '请上传产品'}
      ]
    }   
    const { product, product: {status}, selectedOptions, options, productChange, handleSubmit } = this.props;
    const statusValue = !status ? [] : status === 1 ? [1] : status === 2 ? [2] : status === 3 ? [1,2] : [];
    return (
      <div className="form-content">
        <Form model={product} ref="form" rules={rules} labelWidth="120">
          <Form.Item label="所属栏目" prop="column">
            <Cascader
              options={options} 
              value={selectedOptions} 
              onChange={ (v, s) => { productChange({ selectedOptions: s, product: {...product, ...{column: v}} })}} />
          </Form.Item>

          <Form.Item label="标题" prop="title">
            <Input value={product.title} onChange={value => productChange({product: {...product, ...{title: value}}})}></Input>
          </Form.Item>

          <Form.Item label="参考价" prop="price">
            <Input style={{width: 150}} value={product.price} onChange={value => productChange({product: {...product, ...{price: value}}})}></Input>
          </Form.Item>

          <Form.Item label="状态" prop="status">
            <Checkbox.Group value={statusValue}
              onChange={value => productChange({product: { ...product, ...{status: (value[0] || 0)+(value[1] || 0)} }})} >
              <Checkbox label="推荐" value={1}></Checkbox>
              <Checkbox label="置顶" value={2}></Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="上传产品" prop="subImgs">
            <FileUpload type="picture" files={product.subImgs} onChange={files => productChange({product: {...product, ...{files: files}}})}/>
          </Form.Item>

          <Form.Item label="内容摘要" prop="abstract">
            <Input type="textarea" autosize={{ minRows: 2, maxRows: 4}} value={product.abstract} onChange={value => productChange({product: {...product, ...{abstract: value}}})}></Input>
          </Form.Item>

          <Form.Item label="产品说明" prop="content">
            <RichEditor placeholder="填写内容详情..." value={product.content || ''} onChange={value => productChange({product: {...product, ...{content: value}}})} />
          </Form.Item>
          
          <Form.Item className="submit-content">
            <Button type="primary" onClick={() => handleSubmit(this.refs.form)}>立即保存</Button>
            
          </Form.Item>
        </Form>
      </div>
    )
  }
}

ProductSave.propTypes = {
  product: PropTypes.object.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
}

export default ProductSave;