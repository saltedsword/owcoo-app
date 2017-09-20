import ProductActions from '../../actions/ProductActions';
import { connect } from 'react-redux';
import ProductList from './ProductList.jsx';
import PropTypes from 'prop-types';
import frontInit from '../common/frontInit';

const handlePage = (currentPage, searchParams, dispatch) => {
  searchParams.set('p', currentPage);
  dispatch(ProductActions.productList('?' + searchParams.toString()));
}

const mapStateToProps = state => {
  return state.frontProductList;
}

const mapDispatchToProps = dispatch => {
  return {
    handlePage: (currentPage, searchParams) => handlePage(currentPage, searchParams, dispatch),
    productList: searchString => dispatch(ProductActions.productList(searchString)),
    frontInit: (payload) => frontInit(payload, dispatch),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(ProductList);
container.contextTypes = { store: PropTypes.object };
export default container;