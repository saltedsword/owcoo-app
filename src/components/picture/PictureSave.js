import PictureActions from '../../actions/PictureActions';
import { connect } from 'react-redux';
import PictureSave from './PictureSave.jsx';
import PropTypes from 'prop-types';

// HeaderActions.headerInit([{name: '内容'}, {name: '管理', url: '/admin/manage'}, {name: '编辑文章'}]);
const handleSubmit = function (form, dispatch) {
  form.validate((valid) => {
    if (valid) {
      dispatch(PictureActions.savePicture());
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}

const mapStateToProps = state => {
  return state.savePicture;
}

const mapDispatchToProps = dispatch => {
  return {
    pictureChange: payload => dispatch({ type: 'PICTURE_CHANGE', payload: payload }),
    handleSubmit: form => handleSubmit(form, dispatch),
    pictureInit: payload => dispatch(PictureActions.pictureInit(payload)),
    headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}
const container = connect(mapStateToProps, mapDispatchToProps)(PictureSave);
container.contextTypes = { store: PropTypes.object };
export default container;