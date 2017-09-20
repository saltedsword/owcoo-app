import ProductActions from '../../actions/ProductActions';
import { connect } from 'react-redux';
import ProductSave from './ProductSave.jsx';
import PropTypes from 'prop-types';

// HeaderActions.headerInit([{name: '内容'}, {name: '管理', url: '/admin/manage'}, {name: '编辑文章'}]);
const handleSubmit = function (form, dispatch) {
  form.validate((valid) => {
    if (valid) {
      dispatch(ProductActions.saveProduct());
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}

const mapStateToProps = state => {
  return state.saveProduct;
}

const mapDispatchToProps = dispatch => {
  return {
    productChange: payload => dispatch({ type: 'PRODUCT_CHANGE', payload: payload }),
    handleSubmit: form => handleSubmit(form, dispatch),
    productInit: payload => dispatch(ProductActions.productInit(payload)),
    headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}
const container = connect(mapStateToProps, mapDispatchToProps)(ProductSave);
container.contextTypes = { store: PropTypes.object };
export default container;