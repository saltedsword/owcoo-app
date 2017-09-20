import React, { Component } from 'react';
import { Button, Select, Tree, Dialog, Input, Form, InputNumber, Notification } from 'element-react';
import 'element-theme-default';
import './ResourceList.css';

class ResourceList extends Component {

  componentDidMount(){
    this.props.headerInit([{name: '系统管理'}, {name: '资源管理'}]);
    this.props.resourceList();
  }

  shouldComponentUpdate(nextProps){
    const { status, msg } = nextProps;
    switch(status) {
      case 'loading': /*Notification.info('loading...');*/ return false;
      case 'error': Notification.error(msg); return false;
      case 'success': return true;
      default: return false;
    }
  }

  renderContent(nodeModel, data, store) {
    const { append, update, remove } = this.props;

    return (
      <span>
        <span>
          <span>{data.label}</span>
        </span>
        <span style={{float: 'right', marginRight: '20px'}}>
          <Button size="mini" onClick={ () => append(data._id) }>添加</Button>
          <Button size="mini" onClick={ () => update(data._id) }>编辑</Button>
          <Button size="mini" onClick={ () => remove(data._id) }>删除</Button>
        </span>
      </span>);
  }

  render() {
      const rules = {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择资源类型', trigger: 'change' }
        ],
      }
      const { data, resource, resourceType, dialogVisible } = this.props;
      const { append, resourceChange, handleSave, handleReset } = this.props;
      return (
        <div>
          <div className="list-toolbar">
            <div className="add-button">
              <Button type="danger" onClick={() => append()}>添加主菜单</Button>
            </div>
          </div>
          
          <Tree
            data={data}
            isShowCheckbox={false}
            nodeKey="_id"
            defaultExpandAll={true}
            expandOnClickNode={false}
            renderContent={(...args)=>this.renderContent(...args)}
          />

          <Dialog
            title="填写资源信息"
            visible={ dialogVisible }
            onCancel={ () => resourceChange({ dialogVisible: false })}
          >
            <Dialog.Body>
              <Form model={resource} ref="form" rules={rules} labelWidth="80">
                <Form.Item label="父节点" prop="parent">
                  <Input value={resource.parent} disabled={true}></Input>
                </Form.Item>
                <Form.Item label="资源名称" prop="name">
                  <Input value={resource.name} onChange={(v) => resourceChange({resource: {...resource, ...{name: v}}})}></Input>
                </Form.Item>
                <Form.Item label="类型" prop="type">
                  <Select value={resource.type} placeholder="请选择资源类型" onChange={(v) => resourceChange({resource: {...resource, ...{type: v}}})}>
                    {
                      resourceType.map((item, i) => {return <Select.Option key={i} label={item.text} value={item.value} />})
                    }
                  </Select>
                </Form.Item>
                <Form.Item label="资源路径" prop="url">
                  <Input value={resource.url} placeholder="路由或接口地址" onChange={(v) => resourceChange({resource: {...resource, ...{url: v}}})}></Input>
                </Form.Item>
                <Form.Item label="Icon" prop="icon">
                  <Input value={resource.icon} onChange={(v) => resourceChange({resource: {...resource, ...{icon: v}}})}></Input>
                </Form.Item>
                <Form.Item label="排序" prop="sort">
                  <InputNumber defaultValue={resource.sort} value={resource.sort} onChange={(v) => resourceChange({resource: {...resource, ...{sort: v}}})} min="1" />
                </Form.Item>
                <Form.Item label="描述" prop="description">
                  <Input value={resource.description} onChange={(v) => resourceChange({resource: {...resource, ...{description: v}}})}></Input>
                </Form.Item>
              </Form>
            </Dialog.Body>

            <Dialog.Footer className="dialog-footer">
              <Button type="primary" onClick={() => handleSave(this.refs.form)}>确 定</Button>
              <Button onClick={() => handleReset(this.refs.form)}>重置</Button>
            </Dialog.Footer>
          </Dialog>
        </div>
    )
  }
}

export default ResourceList;