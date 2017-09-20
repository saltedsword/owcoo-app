import LoginActions from '../../actions/LoginActions';
import { connect } from 'react-redux';
import Login from './Login.jsx';
import PropTypes from 'prop-types';

const handleSave = (form, dispatch) => {
  form.validate((valid) => {
    if (valid) {
      dispatch(LoginActions.login());
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
  return state.login;
}

const mapDispatchToProps = dispatch => {
  return {
    handleSave: form => handleSave(form, dispatch),
    handleReset: form => handleReset(form, dispatch),
    loginChange: payload => dispatch({ type: 'LOGIN_CHANGE', payload: payload }),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(Login);
container.contextTypes = { store: PropTypes.object };
export default container;