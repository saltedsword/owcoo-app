import React, { Component } from 'react';
import { Button, Table, Pagination, Form, Input, Tree, Dialog, Notification } from 'element-react';
import 'element-theme-default';

class UserGroupList extends Component {
  
  constructor(props) {
    super(props);

    this.columns = [
      {
        type: 'selection'
      },
      {
        label: "管理组名",
        prop: "name",
        width: 160
      },
      {
        label: "管理组描述",
        prop: "description",
      },
      {
        label: "操作",
        prop: "operation",
        width: 200,
        render: data => {
          return (
            <div className="operation">
              <Button plain={true} type="info" size="mini" onClick={ () => this.props.update(data._id) }>编辑</Button>
              <Button plain={true} type="info" size="mini" onClick={ () => this.props.resource(data._id) }>资源</Button>
              <Button type="danger" size="mini" onClick={ () => this.props.remove(data._id) }>删除</Button>
            </div>
          )
        }
      }
    ]
      
    this.rules = {
      name: [
        { required: true, message: '请输入用户组名称', trigger: 'blur' }
      ],
    }
  }

  componentDidMount(){
    this.props.headerInit([{name: '系统管理'}, {name: '用户组管理'}]);
    this.props.userGroupList();
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

  componentDidUpdate() {
    this.tree.setCheckedKeys(this.props.userGroup.resources);
    this.tree.forceUpdate();
  }

  render() {
    const {data, total, currentPage, treeData, userGroup, dialogVisible1, dialogVisible2} = this.props;
    const { userGroupChange, handleSave, handlePage, handleReset } = this.props;

    return (
      <div>
        <div className="list-toolbar">
          <div className="add-button">
            <Button type="danger" onClick={() => this.props.update()}>添加管理组</Button>
          </div>
        </div>
        
        <Table
            style={{width: '100%'}}
            columns={this.columns}
            data={data}
          />
        <div className="pagination">
          <Pagination 
            layout="total, prev, pager, next, jumper" 
            total={total} 
            pageSize={10} 
            currentPage={currentPage}
            onCurrentChange={currentPage=>handlePage(currentPage)}/>
        </div>

        <Dialog
          title="填写用户组信息"
          visible={ dialogVisible1 }
          onCancel={ () => userGroupChange({ dialogVisible1: false }) }
        >
          <Dialog.Body>
            <Form model={userGroup} ref="form" rules={this.rules} labelWidth="120">
              <Form.Item label="管理组名" prop="name">
                <Input value={userGroup.name} onChange={ v => userGroupChange({userGroup: {...userGroup, ...{name: v}}}) }></Input>
              </Form.Item>
              <Form.Item label="管理组描述" prop="description">
                <Input value={userGroup.description} onChange={ v => userGroupChange({userGroup: {...userGroup, ...{description: v}}}) }></Input>
              </Form.Item>
            </Form>
          </Dialog.Body>

          <Dialog.Footer className="dialog-footer">
            <Button type="primary" onClick={() => handleSave(this.refs.form)}>确 定</Button>
            <Button onClick={() => handleReset(this.refs.form)}>重置</Button>
          </Dialog.Footer>
        </Dialog>

        <Dialog
          title="分配资源"
          visible={ dialogVisible2 }
          onCancel={ () => userGroupChange({ dialogVisible2: false }) }
        >
          <Dialog.Body>
            <Tree
              ref={e=>this.tree = e}
              data={treeData}
              isShowCheckbox={true}
              nodeKey="_id"
              onNodeClicked={() => this.tree.forceUpdate()}
            />
          </Dialog.Body>

          <Dialog.Footer className="dialog-footer">
            <Button onClick={ () => userGroupChange({ dialogVisible2: false }) }>取 消</Button>
            <Button type="primary" onClick={e => {userGroup.resources=this.tree.getCheckedKeys(); handleSave(this.refs.form)}}>确 定</Button>
          </Dialog.Footer>
        </Dialog>
      </div>
    )
  }
}

export default UserGroupList;