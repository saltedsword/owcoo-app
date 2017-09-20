import DownloadActions from '../../actions/DownloadActions';
import { connect } from 'react-redux';
import DownloadSave from './DownloadSave.jsx';
import PropTypes from 'prop-types';

// HeaderActions.headerInit([{name: '内容'}, {name: '管理', url: '/admin/manage'}, {name: '编辑文章'}]);
const handleSubmit = function (form, dispatch) {
  form.validate((valid) => {
    if (valid) {
      dispatch(DownloadActions.saveDownload());
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}

const mapStateToProps = state => {
  return state.saveDownload;
}

const mapDispatchToProps = dispatch => {
  return {
    downloadChange: payload => dispatch({ type: 'DOWNLOAD_CHANGE', payload: payload }),
    handleSubmit: form => handleSubmit(form, dispatch),
    downloadInit: payload => dispatch(DownloadActions.downloadInit(payload)),
    headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}
const container = connect(mapStateToProps, mapDispatchToProps)(DownloadSave);
container.contextTypes = { store: PropTypes.object };
export default container;