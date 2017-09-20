import FetchUtil from '../../utils/frontFetch';
import CONFIG from '../../config';

const ProductActions = {

  showProduct: (payload) => async (dispatch, getState) => {
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}front/showProduct/${payload}`);
    dispatch({ type: 'SHOW_PRODUCT', data: res.data });
  },

  productList: (payload) => async (dispatch, getState) => {
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}front/productList${payload}`);
    const { list, currentPage, totalCount } = res.data;
    const data = {
      data: list,
      currentPage: currentPage,
      total: totalCount
    }
    dispatch({ type: 'PRODUCT_LIST', data: data });
  },

};

export default ProductActions;