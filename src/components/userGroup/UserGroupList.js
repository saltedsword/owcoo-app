import { MessageBox } from 'element-react';
import 'element-theme-default';
import UserGroupActions from '../../actions/UserGroupActions';
import { connect } from 'react-redux';
import UserGroupList from './UserGroupList.jsx';
import PropTypes from 'prop-types';

const update = (id, dispatch) => {
  dispatch(UserGroupActions.userGroupInit({_id: id, dialog: 'dialogVisible1'}));
}

const resource = (id, dispatch) => {
  dispatch(UserGroupActions.userGroupInit({_id: id, dialog: 'dialogVisible2'}));
}

const remove = (id, dispatch) => {
  MessageBox.confirm('确定要删除吗?', '提示', {
    type: 'warning'
  }).then(() => {
    dispatch(UserGroupActions.delUserGroup(id));
  }).catch((err) => { console.log(err) });
}

const handleSave = (form, dispatch) => {
  form.validate((valid) => {
    if (valid) {
      dispatch(UserGroupActions.saveUserGroup());
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}

const handleReset = (form, dispatch) => {
  form.resetFields();
  dispatch({type: 'FORCE_UPDATE'});
}

const handlePage = (currentPage, dispatch) => {
  dispatch(UserGroupActions.userGroupList(currentPage));
}

const mapStateToProps = state => {
  return state.userGroupList;
}

const mapDispatchToProps = dispatch => {
  return {
    update: id => update(id, dispatch),
    resource: id => resource(id, dispatch),
    remove: id => remove(id, dispatch),
    handleSave: form => handleSave(form, dispatch),
    handleReset: form => handleReset(form, dispatch),
    handlePage: currentPage => handlePage(currentPage, dispatch),
    userGroupList: () => dispatch(UserGroupActions.userGroupList()),
    userGroupChange: payload => dispatch({ type: 'USERGROUP_CHANGE', payload: payload }),
    headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(UserGroupList);
container.contextTypes = { store: PropTypes.object };
export default container;