import React, { Component } from 'react';
import { Button, Form, Input, Notification, Cascader } from 'element-react';
import { FileUpload, RichEditor } from '../common';
import 'element-theme-default';

class WebsiteSave extends Component {

  componentDidMount(){
    this.props.headerInit([{name: '系统管理'}, {name: '系统设置'}]);
    this.props.websiteInit();
  }

  shouldComponentUpdate(nextProps){
    const { status, msg } = nextProps;
    switch(status) {
      case 'loading': /*Notification.info('loading...');*/ return false;
      case 'error': Notification.error(msg); return false;
      case 'success': return true;
      case 'saved': Notification.success(msg); return true;
      default: return false;
    }
  }

  render() {
    const rules = {
      title: [
        { required: true, message: '请填写网站名称', trigger: 'blur' }
      ]
    }
    const { website, saved, aboutUsOptions, aboutUsSelectedOptions } = this.props;
    const { websiteChange, handleSave } = this.props;

    return (
      <div className="form-content">
        <Form model={website} ref="form" rules={rules} labelWidth="120">

          <Form.Item label="站点名称" prop="title">
            <Input value={website.title} onChange={value => websiteChange({website: {...website, ...{title: value}}})}></Input>
          </Form.Item>

          <Form.Item label="网站LOGO" prop="logo">
            <FileUpload type="avatar" files={website.logo} onChange={files => websiteChange({website: {...website, ...{logo: files}}})}/>
          </Form.Item>

          <Form.Item label="地址栏图标" prop="ico">
            <FileUpload type="avatar" files={website.ico} onChange={files => websiteChange({website: {...website, ...{ico: files}}})}/>
          </Form.Item>

          <Form.Item label="站点关键字" prop="keywords">
            <Input value={website.keywords} onChange={value => websiteChange({website: {...website, ...{keywords: value}}})}></Input>
          </Form.Item>
          <Form.Item label="站点描述" prop="description">
            <Input value={website.description} onChange={value => websiteChange({website: {...website, ...{description: value}}})}></Input>
          </Form.Item>
          <Form.Item label="版权信息" prop="rights">
            <Input value={website.rights} onChange={value => websiteChange({website: {...website, ...{rights: value}}})}></Input>
          </Form.Item>

          <Form.Item label="首页关于我们" prop="aboutUsId">
            <Cascader
              options={aboutUsOptions}
              props={{label: 'name', value: '_id', children: 'children'}}
              value={aboutUsSelectedOptions}
              onChange={ so => websiteChange({aboutUsSelectedOptions: so, website: {...website, ...{aboutUsId: so[so.length-1]}}})} />
          </Form.Item>
          <Form.Item label="关于我们简介" prop="aboutUsContent">
            <RichEditor placeholder="填写内容详情..." value={website.aboutUsContent || ''} onChange={value => websiteChange({website: {...website, ...{aboutUsContent: value}}})} />
          </Form.Item>
          <Form.Item label="关于我们图片" prop="aboutUsPic">
            <FileUpload type="picture" files={website.aboutUsPic} onChange={files => websiteChange({website: {...website, ...{aboutUsPic: files}}})}/>
          </Form.Item>

          <Form.Item label="首页banner设置" prop="banner">
            <FileUpload type="picture" files={website.banner} onChange={files => websiteChange({website: {...website, ...{banner: files}}})}/>
          </Form.Item>
          
          <Form.Item className="submit-content">
            <Button type="primary" onClick={ () => handleSave(this.refs.form) } disabled={saved}>立即保存</Button>
            
          </Form.Item>
        </Form>
      </div>
    )
  }
}




export default WebsiteSave;