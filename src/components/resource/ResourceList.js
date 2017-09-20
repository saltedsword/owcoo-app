import { MessageBox } from 'element-react';
import 'element-theme-default';
import ResourceActions from '../../actions/ResourceActions';
import { connect } from 'react-redux';
import ResourceList from './ResourceList.jsx';
import PropTypes from 'prop-types';

const append = (id, dispatch) => {
  dispatch(ResourceActions.resourceInit({parent: id}));
}
const update = (id, dispatch) => {
  dispatch(ResourceActions.resourceInit({_id: id}));
}

const remove = (id, dispatch) => {
  MessageBox.confirm('确定要删除吗?', '提示', {
    type: 'warning'
  }).then(() => {
    dispatch(ResourceActions.delResource(id));
  }).catch((err) => { console.log(err) });
}


const handleSave = (form, dispatch) => {
  form.validate((valid) => {
    if (valid) {
      dispatch(ResourceActions.saveResource());
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

const mapStateToProps = state => {
  return state.resourceList;
}

const mapDispatchToProps = dispatch => {
  return {
    append: id => append(id, dispatch),
    update: id => update(id, dispatch),
    remove: id => remove(id, dispatch),
    handleSave: form => handleSave(form, dispatch),
    handleReset: form => handleReset(form, dispatch),
    resourceList: () => dispatch(ResourceActions.resourceList()),
    resourceChange: payload => dispatch({ type: 'RESOURCE_CHANGE', payload: payload }),
    headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(ResourceList);
container.contextTypes = { store: PropTypes.object };
export default container;