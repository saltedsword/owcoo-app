import React from 'react';
import { Component } from 'react';
import { Table , Button , Input, Dialog, Cascader, Notification, Switch } from 'element-react';
import './Column.css';
import imgs from '../../resources/imgs/column';

export default class Column extends Component {
  constructor(props) {
    super(props);
    
    this.columns = [
      {
        label: "排序",
        width: 100,
        render: data => {
          return (
            <Input style={{width: '40px'}} value={data.sort} onChange={value => {data.sort = value; this.props.columnChange({data: this.props.data})}} disabled={!data.writable}/>
          )
        }
      },
      {
        label: "栏目名称",
        width: 320,
        render: data => {
          return (
            <div>
              <Input value={data.name} onChange={value => {data.name = value; this.props.columnChange({data: this.props.data})}} disabled={!data.writable} prepend={
                this.renderExpandImg(data)
              }/>
            </div>
          )
        }
      },
      {
        label: "导航栏显示",
        width: 240,
        render: data => {
          return (
            <select className="column-table-select" value={data.display} onChange={e => {data.display = e.target.value; this.props.columnChange({data: this.props.data})}} disabled={!data.writable}>
              {
                this.props.display.map(el => {
                  return <option key={el.value} value={el.value}>{el.text}</option>
                })
              }
            </select>
          )
        }
      },
      {
        label: "所属模块",
        width: 240,
        render: data => {
          return (
            <select className="column-table-select" value={data.module} onChange={e => {data.module = e.target.value; this.props.columnChange({data: this.props.data})}} disabled={data._id ? true : data.level>1}>
              {
                this.props.module.map(el => {
                  return <option key={el.value} value={el.value}>{el.text}</option>
                })
              }
            </select>
          )
        }
      },
      {
        label: "操作",
        prop: "operation",
        width: 300,
        render: data => {
          const {isSaving, lastContent, lastEditorIndex, data: treeData } = this.props;
          const {handleEditor, handleMoveInit, handleAdd, handleDel, handleSave, handleCancel} = this.props;

          return (
            data._id === lastContent._id  ?
            <div>
              <Button type="success" size="small" onClick={ e => handleSave(data) }>保存</Button>
              <Button plain={true} type="info" size="small" onClick={ e => handleCancel(lastContent, lastEditorIndex, treeData) }>取消</Button>
            </div>
            :
            <div>
              <Button plain={true} type="info" size="small" onClick={ e => handleEditor(data._id, treeData) } disabled={isSaving ? data._id !== lastContent._id : false}>编辑</Button>
              <Button type="info" size="small" onClick={ e => handleMoveInit(data._id) } disabled={isSaving ? data._id !== lastContent._id : data.options['move'] === undefined}>移动</Button>
              <Button plain={true} type="info" size="small" onClick={ e => handleAdd(data, treeData) } disabled={isSaving ? data._id !== lastContent._id : data.options['append'] === undefined}>追加</Button>
              <Button type="danger" size="small" onClick={ e => handleDel(data._id) } disabled={isSaving ? data._id !== lastContent._id : data.options['del'] === undefined}>删除</Button>
            </div> 
          )
        }
      }
    ];
  }

  componentDidMount(){
    this.props._clear();// 组件挂载后 清除state中关于column的残留数据
    this.props.headerInit([{name: '栏目管理'}]);
    this.props.columnList();
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

  renderExpandImg(data) {
    const { handleExpand, handleUnexpand, isSaving, data: treeData } = this.props;
    function getBg_column(level) {
      let bg_column = null;
      switch (level) {
        case 1: bg_column = <img style={{position: 'relative',top: '6px'}} src={imgs['bg_column1']} alt="" />; break;
        case 2: bg_column = <img style={{position: 'relative',top: '6px'}} src={imgs['bg_column2']} alt="" />; break;
        case 3: bg_column = <img style={{position: 'relative',top: '6px'}} src={imgs['bg_column3']} alt="" />; break;
        default:
      }
      return bg_column;
    }
    
    return data.children ? 
    (
      data.hasExpand ? <div>{getBg_column(data.level)}<i className="el-icon-caret-bottom" style={{cursor: 'pointer'}} onClick={() => handleUnexpand(data._id, isSaving, treeData)}/></div>
      :
      <div>{getBg_column(data.level)}<i className="el-icon-caret-right" style={{cursor: 'pointer'}} onClick={() => handleExpand(data._id, isSaving, treeData)}/></div>
    ) : (
      data.level ? <div>{getBg_column(data.level+1)}</div>
      :
      <i style={{padding: '7px'}}/>
    )
  }

  render() {
    const {moveBody, moveInit, isSaving, data, dialogVisible, expandAll } = this.props;
    const {handleAdd, columnChange, handleMove, columnExpandAll } = this.props;

    return (
      <div>
        <div className="list-toolbar">
          <div className="add-button">
           <Button type="danger" onClick={e => handleAdd(null, data)} disabled={ isSaving ? true : false }>添加一级栏目</Button>
          </div>
          <div className="expandAll">
            <span>展开全部子栏目</span>
            <Switch
              value={expandAll}
              onText="是"
              offText="否"
              onChange={value => columnExpandAll(value)}
              disabled={ isSaving ? true : false }>
            </Switch>
          </div>
        </div>
        <div className="table-box">
          <Table
              style={{width: '100%'}}
              columns={this.columns}
              data={data}
            />
        </div>

        <Dialog
          title="可移动的栏目"
          visible={ dialogVisible }
          onCancel={ () => columnChange({ dialogVisible: false }) }
          >
          <Dialog.Body>
            可移动栏目：
             <Cascader
              options={moveInit}
              props={{value: '_id', label: 'name'}}
              changeOnSelect={true}
              onChange={value => moveBody.parent = value[value.length-1]}
            />
          </Dialog.Body>

          <Dialog.Footer className="dialog-footer">
            <Button onClick={ () => columnChange({ dialogVisible: false }) }>取 消</Button>
            <Button type="primary" onClick={ () => handleMove(moveBody) }>确 定</Button>
          </Dialog.Footer>
        </Dialog>
      </div>
    )
  }
}