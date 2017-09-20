import { MessageBox, Notification } from 'element-react';
import 'element-theme-default';
import ColumnActions from '../../actions/ColumnActions';
import { connect } from 'react-redux';
import Column from './Column.jsx';
import PropTypes from 'prop-types';

const columnChange = (payload, dispatch) => dispatch({ type: 'COLUMN_CHANGE', payload: payload });

const _clear = (dispatch) => {
  columnChange({isSaving: false, lastEditorIndex: '', lastContent: {
    _id: '',
    sort: '',
    name: '',
    display: '',
  }}, dispatch);
}

const _getIndexById = (id, data) => {
  for(let i in data) {
    if(data[i]._id === id)
      return Number(i);
  }
}

const handleDel = (id, dispatch) => {
  MessageBox.confirm('确定要删除吗?', '提示', {
    type: 'warning'
  }).then(() => {
    dispatch(ColumnActions.delColumn(id));
  }).catch((err) => { console.log(err) });
}

const handleEditor = (id, data, dispatch) => {
  const index = _getIndexById(id, data);
  data[index].writable = true;
  
  columnChange({data: data, isSaving: true, lastEditorIndex: index, lastContent: {_id:data[index]._id, sort: data[index].sort, name: data[index].name, display: data[index].display}}, dispatch);
}

const handleMoveInit = (id, dispatch) => {
  dispatch(ColumnActions.columnMoveInit(id));
}

const handleMove = (moveBody, dispatch) => {
  if (!moveBody.parent) return Notification.error('需要选定移动到的栏目！');
  dispatch(ColumnActions.moveColumn(moveBody));
}

const handleSave = (column, dispatch) => {
  const target = {
    _id: column._id, 
    name: column.name, 
    display: column.display, 
    sort: column.sort,
  }
  if (!column._id) {
    target.parent = column.parent || null;
    target.module = column.module;
  }

  dispatch(ColumnActions.saveColumn(target));
}

const handleAdd = (column, data, dispatch) => {
  const target = {
    _id: '',
    name: '',
    parent: column ? column._id : '',
    display: 1,
    module: column ? column.module : 'article',
    writable: true,
    level: column ? (column.level || 0) + 1 : 0,
  };
  let index = -1;
  if(column) {
    index = _getIndexById(column._id, data) + 1;
    data.splice(index, 0, target);
  } else {
    index = data.length;
    data.push(target);
  }
  columnChange({data: data, isSaving: true, lastEditorIndex: index}, dispatch);
}

const handleCancel = (lastContent, lastEditorIndex, data, dispatch) => {
  const last = data[lastEditorIndex];
  if (!last._id) {
    data.splice(lastEditorIndex, 1);
  } else {
    last.writable = false;
    Object.assign(last, lastContent);
  }
  
  columnChange({data: data, isSaving: false, lastEditorIndex: '', lastContent: {
    _id: '',
    sort: '',
    name: '',
    display: '',
  }}, dispatch);
}

const handleExpand = (id, isSaving, data, dispatch) => {
  if (isSaving) return false;
  const index = _getIndexById(id, data);
  const node = data[index];
  node.hasExpand = true;
  const children = node.children.map(n => {return Object.assign({}, n, {hasExpand: !(n.children && n.children.length>0), level: (node.level || 0) + 1})});
  data.splice(index+1 , 0, ...children);
  let expandAll = true;
  for (let i=0; i<data.length; i++) {
    if (!data[i].hasExpand) {
      expandAll = false;
      break;
    }
  }
  columnChange({ data, expandAll }, dispatch);
}

const handleUnexpand = (id, isSaving, data, dispatch) => {
  if (isSaving) return false;

  const index = _getIndexById(id, data);
  const node = data[index];
  node.hasExpand = false;
  let childrenCount = 0;
  for(let i=index+1; i<data.length; i++) {
    if ((data[i].level || 0) <= (node.level || 0)) break;
    childrenCount++;
  }
  data.splice(index+1 , childrenCount);
  columnChange({ data: data, expandAll: false }, dispatch);
}

const mapStateToProps = state => {
  return state.column;
}

const mapDispatchToProps = dispatch => {
  return {
    _clear: () => _clear(dispatch),// 用于组件首次挂载时，清除state中关于column的残留数据
    columnChange: payload => columnChange(payload, dispatch),
    _getIndexById: (id, data) => _getIndexById(id, data),
    handleDel: id => handleDel(id, dispatch),
    handleEditor: (id, data) => handleEditor(id, data, dispatch),
    handleMoveInit: (id) => handleMoveInit(id, dispatch),
    handleMove: (moveBody) => handleMove(moveBody, dispatch),
    handleSave: (column) => handleSave(column, dispatch),
    handleAdd: (column, data) => handleAdd(column, data, dispatch),
    handleCancel: (lastContent, lastEditorIndex, data) => handleCancel(lastContent, lastEditorIndex, data, dispatch),
    handleExpand: (id, isSaving, data) => handleExpand(id, isSaving, data, dispatch),
    handleUnexpand: (id, isSaving, data) => handleUnexpand(id, isSaving, data, dispatch),
    columnList: () => dispatch(ColumnActions.columnList()),
    columnExpandAll: (expandAll) => dispatch(ColumnActions.columnExpandAll(expandAll)),
    headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(Column);
container.contextTypes = { store: PropTypes.object };
export default container;