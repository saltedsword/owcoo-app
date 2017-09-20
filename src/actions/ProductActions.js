import FetchUtil from '../utils/fetch';
import CONFIG from '../config';

const ProductActions = {

  saveProduct: () => async (dispatch, getState) => {
      dispatch({ type: 'SAVE_PRODUCT', status: 'loading' });

      const product = getState().saveProduct.product;
      const res = await FetchUtil.postData(`${CONFIG.BASE_URL}product/save`, JSON.stringify({product}));
      if (res === false) return;
      if (res.code !== 200) return dispatch({ type: 'SAVE_PRODUCT', status: 'error', msg: res.msg });
      const pushUrl = `/admin/productList?column=${product.column}`;
      dispatch({ type: 'SAVE_PRODUCT', status: 'success', msg:res.msg, pushUrl: pushUrl });
  },

  productInit: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'PRODUCT_INIT', status: 'loading' });

    const queryString = payload.id ? `/${payload.id}?c=${payload.c || ''}` : `?c=${payload.c || ''}`;
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}product/saveInit${queryString}`)
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'PRODUCT_INIT', status: 'error', msg: res.msg });
    dispatch({ type: 'PRODUCT_INIT', status: 'success', msg:res.msg, data: res.data });    
  },

  productList: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'PRODUCT_LIST', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}product/list${payload}`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'PRODUCT_LIST', status: 'error', msg: res.msg });

    const { list, options, selectedOptions, currentPage, totalCount } = res.data;
    options.unshift({value:'', label: '所有栏目'});
    const data = {
      data: list,
      options: options,
      selectedOptions: selectedOptions,
      currentPage: currentPage,
      total: totalCount
    }
    dispatch({ type: 'PRODUCT_LIST', status: 'success', msg:res.msg, data: data });  
  },

  delProduct: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'DEL_PRODUCT', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}product/del/${payload}`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'DEL_PRODUCT', status: 'error', msg: res.msg });
    dispatch({ type: 'DEL_PRODUCT', status: 'success', msg:res.msg, deleted: res.deleted });    
  },
};

export default ProductActions;