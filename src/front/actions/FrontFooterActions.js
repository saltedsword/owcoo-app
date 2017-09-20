import FetchUtil from '../../utils/frontFetch';
import CONFIG from '../../config';

const FrontFooterActions = {

  frontFooterInit: () => async (dispatch, getState) => {
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}front/footerInit`);
    dispatch({ type: 'FRONT_FOOTER_INIT', data: res.data });
  },

};

export default FrontFooterActions;