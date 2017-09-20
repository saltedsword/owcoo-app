import { MessageBox } from 'element-react';
import 'element-theme-default';
import UserActions from '../../actions/UserActions';
import { connect } from 'react-redux';
import UserList from './UserList.jsx';
import PropTypes from 'prop-types';

const update = (id, dispatch) => {
  dispatch(UserActions.userInit({_id: id}));
}

const remove = (id, dispatch) => {
  MessageBox.confirm('确定要删除吗?', '提示', {
    type: 'warning'
  }).then(() => {
    dispatch(UserActions.delUser(id));
  }).catch((err) => { console.log(err) });
}

const handleSave = (form, dispatch) => {
  form.validate((valid) => {
    if (valid) {
      dispatch(UserActions.saveUser());
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
  dispatch(UserActions.userList(currentPage));
}

const mapStateToProps = state => {
  return state.userList;
}

const mapDispatchToProps = dispatch => {
  return {
    update: id => update(id, dispatch),
    remove: id => remove(id, dispatch),
    handleSave: form => handleSave(form, dispatch),
    handleReset: form => handleReset(form, dispatch),
    handlePage: currentPage => handlePage(currentPage, dispatch),
    userList: () => dispatch(UserActions.userList()),
    userChange: payload => dispatch({ type: 'USER_CHANGE', payload: payload }),
    headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(UserList);
container.contextTypes = { store: PropTypes.object };
export default container;