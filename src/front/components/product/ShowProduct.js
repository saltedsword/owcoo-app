import ProductActions from '../../actions/ProductActions';
import { connect } from 'react-redux';
import ShowProduct from './ShowProduct.jsx';
import PropTypes from 'prop-types';
import frontInit from '../common/frontInit';

const mapStateToProps = state => {
  return state.frontShowProduct;
}

const mapDispatchToProps = dispatch => {
  return {
    showProduct: payload => dispatch(ProductActions.showProduct(payload)),
    frontInit: (payload) => frontInit(payload, dispatch),
  }
}
const container = connect(mapStateToProps, mapDispatchToProps)(ShowProduct);
container.contextTypes = { store: PropTypes.object };
export default container;