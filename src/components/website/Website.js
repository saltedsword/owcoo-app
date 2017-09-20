import WebsiteActions from '../../actions/WebsiteActions';
import { connect } from 'react-redux';
import Website from './Website.jsx';
import PropTypes from 'prop-types';

const handleSave = (form, dispatch) => {
  form.validate((valid) => {
    if (valid) {
      dispatch(WebsiteActions.saveWebsite());
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}

const mapStateToProps = state => {
  return state.website;
}

const mapDispatchToProps = dispatch => {
  return {
    handleSave: form => handleSave(form, dispatch),
    websiteInit: () => dispatch(WebsiteActions.websiteInit()),
    websiteChange: payload => dispatch({ type: 'WEBSITE_CHANGE', payload: payload }),
    headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(Website);
container.contextTypes = { store: PropTypes.object };
export default container;